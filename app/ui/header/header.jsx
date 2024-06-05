"use client";

import styles from "./header.module.css";
import { createContext, useContext, useState, useEffect } from "react";
import { useRootcontext } from "@/app/context";

const HeaderContext = createContext(null);


export default function Header({ children, position, isInnerpage }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const { root } = useRootcontext();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Destructure the specific items you want to pass from root
    const { logo, short_name } = root;

    const contextData = {
        logo: logo,
        short_name: short_name,
        isScrolled: isScrolled,
    };

    return (
        <HeaderContext.Provider value={contextData}>
            <header id="header" className={`
                ${styles.header}
                ${isScrolled ? styles.scrolled : ""}
                ${isInnerpage ? styles.innerpage : ""}
                ${position === "fixed" ? "fixed-top" : "sticky-top"}
            `}>
                <div className="container d-flex align-items-center">
                    {children}
                </div>
            </header>
        </HeaderContext.Provider>
    );
}

// Custom hook to use the Header context
export function useHeadercontext() {
    return useContext(HeaderContext);
}
