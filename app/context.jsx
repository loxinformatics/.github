"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BaseContext = createContext(null);
const AuthContext = createContext(null);

export default function RootContextProvider({ children }) {
    const [base, setBase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiBaseUrl = process.env.ENVIRONMENT === "production"
        ? "https://api.loxinformatics.com/base/"
        : "http://127.0.0.1:8000/base/";


    useEffect(() => {
        const fetchBase = async () => {
            try {
                const response = await fetch(apiBaseUrl);
                const result = await response.json();
                setBase(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBase();
    }, [apiBaseUrl]);

    return (
        <BaseContext.Provider value={{ base, loading, error }}>
            <AuthContext.Provider>
                {children}
            </AuthContext.Provider>
        </BaseContext.Provider>
    );

};

export function useBaseContext() {
    const { base, loading, error } = useContext(BaseContext);

    if (loading) return { data: <div>Loading...</div>, isLoading: true };
    if (error) return { data: <div>Error: {error.message}</div>, isLoading: false };
    if (!base || base.length === 0) return { data: <div>No data available</div>, isLoading: false };

    const data = base[0];
    return { data, isLoading: false };
}