"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Preloader from "@/app/ui/Preloader/Preloader";
import ErrorModal from "@/app/ui/ErrorModal/ErrorModal";

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
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
        if (!authTokens) {
            setLoading(false);
            return;
        }

        try {
            const apiAuthRefreshUrl = process.env.ENVIRONMENT === "production"
                ? "https://api.loxinformatics.com/auth/token/refresh/"
                : "http://127.0.0.1:8000/auth/token/refresh/";

            const response = await fetch(apiAuthRefreshUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: authTokens.refresh }),
            });

            if (response.status === 200) {
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
            setLoading(false);
        }
    }, [authTokens, logoutUser]);

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
        authTokens,
        setAuthTokens,
        user,
        setUser,
    };

    if (loading) return <Preloader />;
    if (error) return <ErrorModal message={error} />;

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}

export function PrivateRoute({ children }) {
    const { user } = useAuthContext();
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
