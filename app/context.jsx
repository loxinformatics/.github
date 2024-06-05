"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Preloader from "@/app/ui/preloader/preloader";
import ErrorModal from "@/app/ui/errormodal/errormodal";

const Root = createContext(null);


export default function RootContext({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [root, setRoot] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
        ? "https://api.loxinformatics.com"
        : "http://127.0.0.1:8000";


    useEffect(() => {
        const fetchRootData = async () => {
            try {
                const response = await fetch(apiUrl + "/root/");
                const data = await response.json();
                setRoot(data[0]);
            } catch (error) {
                setError(`RootContext Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRootData();
    }, [apiUrl]);

    const contextData = {
        root: root,
        apiUrl: apiUrl,
    };

    return (
        <Root.Provider value={contextData}>
            {loading ? <Preloader /> : error ? <ErrorModal message={error} /> : (
                <>
                    {children}
                </>
            )}
        </Root.Provider>
    );
}

// Custom hook to use the Root context
export function useRootcontext() {
    return useContext(Root);
}
