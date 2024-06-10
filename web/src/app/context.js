"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Preloader from "@/app/utils/preloader/preloader";

const baseContext = createContext(null);

const apiUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? "https://www.loxinformatics.com/api"
    : "http://127.0.0.1:8000/api";

export { apiUrl };

export default function BaseContext({ children }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [base, setBase] = useState(null);

    useEffect(() => {
        const fetchBase = async () => {
            try {
                const response = await fetch(apiUrl + "/base/");
                const data = await response.json();
                setBase(data[0]);
            } catch (e) {
                setError(`Base Provider Error: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBase();
    }, []);

    const contextData = {
        base: base,
    };

    return (
        <baseContext.Provider value={contextData}>
            {loading ? (
                <Preloader />
            ) : error ? (
                <>
                    {console.error(error)}
                    {children}
                </>
            ) : (
                children
            )}
        </baseContext.Provider>
    );
}

// Custom hook to use the Base context
export function useBaseContext() {
    return useContext(baseContext);
}
