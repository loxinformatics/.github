"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Logo from "@/app/ui/Header/Logo/Logo";
import NavBar from "@/app/ui/Header/NavBar/NavBar";
import ForwardBtn from "@/app/ui/Header/ForwardBtn/ForwardBtn";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    const [isAuthPage, setIsAuthPage] = useState(false);
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/#hero", icon: "" },
        { name: "About", href: "/#about", icon: "" },
        { name: "Services", href: "/#services", icon: "" },
        { name: "Contact", href: "/#contact", icon: "" },
    ];

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

    useEffect(() => {
        if (pathname === "/") setIsHomePage(true);
        else if (pathname.startsWith("/auth/")) setIsAuthPage(true);
    }, [pathname]);


    return (
        <header id="header" className={`
            ${styles.header}
            ${isHomePage ? "fixed-top" : "sticky-top"}
            ${!isHomePage && !isAuthPage ? styles.innerPage : ""}
            ${isScrolled ? styles.scrolled : ""}
            `}>

            <div className="container d-flex align-items-center justify-content-lg-between">
                <Logo />
                <NavBar links={links} />
                <ForwardBtn
                    name={pathname.startsWith("/auth/") ? "Go Back" : "Get Started"}
                    href={pathname.startsWith("/auth/") ? "/#hero" : "/#about"}
                />
            </div>

        </header>
    );
}