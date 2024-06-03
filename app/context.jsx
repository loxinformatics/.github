"use client";

import AOS from "aos";
import { createContext, useContext, useState, useEffect } from "react";
import Preloader from "@/app/ui/Preloader/Preloader";
import ErrorModal from "@/app/ui/ErrorModal/ErrorModal";
import ScrollTopBtn from "@/app/ui/ScrollTopBtn/ScrollTopBtn";

const RootContext = createContext(null);

export default function Root({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [root_data, setRootData] = useState(null);
    const [apiUrl, setApiUrl] = useState(null);

    useEffect(() => {

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production"){
            setApiUrl("https://api.loxinformatics.com");
        } else {
            setApiUrl("http://127.0.0.1:8000");
        }

        const fetchRootData = async () => {
            if (!apiUrl) return;

            try {
                const response = await fetch(apiUrl + "/root/");
                const result = await response.json();
                setRootData(result);
            } catch (error) {
                setError(`RootContext Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRootData();

    }, [apiUrl]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }, [])

    const contextData = {
        root_data: root_data,
        apiUrl: apiUrl,
    };

    return (
        <RootContext.Provider value={contextData}>
            {loading ? (
                <Preloader />
            ) : error ? (
                <ErrorModal message={error} />
            ) : (
                <>
                    {children}
                    <ScrollTopBtn />
                </>
            )}
        </RootContext.Provider>
    );
}

export function useRoot() {
    const { root_data, apiUrl } = useContext(RootContext);
    const root = root_data ? root_data[0] : null;
    return { root, apiUrl };
}
