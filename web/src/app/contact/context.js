"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Loader from "@/app/utils/loader/loader";
import Error from "@/app/utils/error/error";
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
            } catch (error) {
                setError(`Contact Info Provider Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, []);

    const contextData = {
        contact_info: contact_info,
        apiUrl: apiUrl,
    };

    return (
        <contactContext.Provider value={contextData}>
            {loading ? <Loader /> : error ? <Error message={error} /> : children}
        </contactContext.Provider>
    );
}

// Custom hook to use the Base context
export function useContactContext() {
    return useContext(contactContext);
}
