"use client";

import { createContext, useContext } from "react";
import { useAuthcontext } from "@/app/auth/context";

const SectionContext = createContext(null);


export default function Section({ children }) {
    const { apiUrl, setAuthTokens, setUser } = useAuthcontext();

    const contextData = {
        apiUrl: apiUrl,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
    };

    return (
        <SectionContext.Provider value={contextData}>
            <section className={`row flex-grow-1 d-flex align-items-center justify-content-center py-3`}>
                {children}
            </section>
        </SectionContext.Provider>
    );
}

// Custom hook to use the Section context
export function useSectionContext() {
    return useContext(SectionContext);
}