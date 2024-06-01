"use client";

import AOS from "aos";
import { createContext, useContext, useState, useEffect } from "react";
import Preloader from "@/app/ui/Preloader/Preloader";
import ErrorModal from "@/app/ui/ErrorModal/ErrorModal";

const RootContext = createContext(null);

export default function RootContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [root_data, setRootData] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });

        const fetchRootData = async () => {
            try {
                const apiRootUrl = process.env.ENVIRONMENT === "production"
                    ? "https://api.loxinformatics.com/root/"
                    : "http://127.0.0.1:8000/root/";

                const response = await fetch(apiRootUrl);
                const result = await response.json();
                setRootData(result);
            } catch (error) {
                setError(`RootContext Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRootData();
    }, []);

    const contextData = {
        root_data: root_data,
    };

    if (loading) return <Preloader />;
    if (error) return <ErrorModal message={error} />;

    return (
        <RootContext.Provider value={contextData}>
            {children}
        </RootContext.Provider>
    );
}

export function useRootContext() {
    const { root_data } = useContext(RootContext);
    const root = root_data ? root_data[0] : null;
    return { root };
}
