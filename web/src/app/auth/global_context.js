"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { apiUrl } from "../context";
import Loader from "@/app/utils/loader/loader";
import Error from "@/app/utils/error/error";

const authContext = createContext(null);


export default function AuthContext({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [token, setToken] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("token")
                ? JSON.parse(localStorage.getItem("token"))
                : null;
        }
        return null;
    });

    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const tokens = localStorage.getItem("token");
            return tokens ? jwtDecode(JSON.parse(tokens).access) : null;
        }
        return null;
    });

    const logoutUser = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
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
                    refresh: token?.refresh
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("token", JSON.stringify(data));
            } else {
                logoutUser();
            }
        } catch (error) {
            logoutUser();
            setError(`Accounts Provider Error: ${error.message}`);
        } finally {
            if (loading) setLoading(false);
        }

    }, [token?.refresh, loading, logoutUser]);

    useEffect(() => {
        if (loading) {
            if (token) {
                updateToken();
            } else {
                setLoading(false);
            }
        }

        const interval = setInterval(() => {
            if (token) {
                updateToken();
            }
        }, 1000 * 60 * 4); // 4 minutes interval

        return () => clearInterval(interval);

    }, [token, loading, updateToken]);


    const contextData = {
        token: token,
        setToken: setToken,
        user: user,
        setUser: setUser,
        logoutUser: logoutUser,
    };

    return (
        <authContext.Provider value={contextData}>
            {loading ? <Loader /> : error ? <Error message={error} /> : children}
        </authContext.Provider>
    );
}

// Custom hook to use the Auth context
export function useAuthContext() {
    return useContext(authContext);
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

    if (!user) return <Loader />;

    return children;
}

export function PublicRoute({ children }) {
    const { user } = useAuthContext();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (user) {
            const next = searchParams.get("next") || "/";
            router.replace(next);
        }
    }, [router, user, searchParams]);

    if (user) return <Loader />;

    return children;
}