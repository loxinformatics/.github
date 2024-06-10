"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Preloader from "@/app/utils/preloader/preloader";
import { apiUrl } from "../context";

const contactContext = createContext(null);


export default function ContactContext({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contact_info, setContactInfo] = useState(null);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await fetch(apiUrl + "/contact/info");
                const data = await response.json();
                setContactInfo(data[0]);
            } catch (e) {
                setError(`Contact Info Provider Error: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, [error]);

    const contextData = {
        contact_info: contact_info,
        apiUrl: apiUrl,
    };

    return (
        <contactContext.Provider value={contextData}>
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
        </contactContext.Provider>
    );
}

// Custom hook to use the Base context
export function useContactContext() {
    return useContext(contactContext);
}
