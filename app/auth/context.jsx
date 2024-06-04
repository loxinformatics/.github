"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Preloader from "@/app/ui/Preloader/Preloader";
import ErrorModal from "@/app/ui/ErrorModal/ErrorModal";
import { useRoot } from "@/app/context";

const AuthContext = createContext(null);

export default function Auth({ children }) {
    const { apiUrl } = useRoot();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [authTokens, setAuthTokens] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("authTokens")
                ? JSON.parse(localStorage.getItem("authTokens"))
                : null;
        }
        return null;
    });

    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const tokens = localStorage.getItem("authTokens");
            return tokens ? jwtDecode(JSON.parse(tokens).access) : null;
        }
        return null;
    });

    const logoutUser = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        router.replace("/");
    }, [router]);

    const updateToken = useCallback(async () => {
        try {
            const response = await fetch(apiUrl + "/auth/token/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh: authTokens?.refresh
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
            } else {
                logoutUser();
            }
        } catch (error) {
            logoutUser();
            setError(`AuthContext Error: ${error.message}`);
        } finally {
            if (loading) setLoading(false);
        }

    }, [apiUrl, authTokens?.refresh, loading, logoutUser]);

    useEffect(() => {
        if (loading) {
            if (authTokens) {
                updateToken();
            } else {
                setLoading(false);
            }
        }

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, 1000 * 60 * 4); // 4 minutes interval

        return () => clearInterval(interval);

    }, [authTokens, loading, updateToken]);

    const contextData = {
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        user: user,
        setUser: setUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <Preloader /> : error ? <ErrorModal message={error} /> : children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function PrivateRoute({ children }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
        }
    }, [router, user, pathname]);

    if (!user) return <Preloader />;

    return children;
}

export function PublicRoute({ children }) {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (user) {
            const next = searchParams.get("next") || "/";
            router.replace(next);
        }
    }, [router, user, searchParams]);

    if (user) return <Preloader />;

    return children;
}
