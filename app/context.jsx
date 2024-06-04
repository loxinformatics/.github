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

        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
        
    }, [apiUrl]);

    const contextData = {
        root: root,
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
    return useContext(RootContext);
}
