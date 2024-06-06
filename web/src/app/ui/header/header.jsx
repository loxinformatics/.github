"use client";

import "./header.css";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BsX, BsList } from "react-icons/bs";
import BaseContext, { useBaseContext } from "@/app/context";


export default function Header({ children, position }) {
    const [hasbackground, setHasBackground] = useState(false);
    
    useEffect(() => {
        const handleBackground = () => {
            if (window.scrollY > 10 || window.innerHeight <= 555 || position === "sticky-top") {
                setHasBackground(true);
            } else {
                setHasBackground(false);
            }
        };

        handleBackground();
        window.addEventListener("scroll", handleBackground);
        window.addEventListener("resize", handleBackground);

        return () => {
            window.removeEventListener("scroll", handleBackground);
            window.removeEventListener("resize", handleBackground);
        };
    }, [position]);

    return (
        <BaseContext>
            <header id="header" className={`header
                ${position}
                ${hasbackground ? "header_bg" : ""}
            `}>
                <div className="container d-flex align-items-center">
                    {children}
                </div>
            </header>
        </BaseContext>
    );
}

export function Logo() {
    const { base } = useBaseContext();
    const logo = base?.logo;
    const short_name = base?.short_name;

    return (
        <Link href="/#hero" className="link-white">
            {logo ? (
                <Image
                    src={logo}
                    width={55}
                    height={55}
                    alt="logo"
                    priority={true}
                />
            ) : short_name ? (
                <h1 className={`logo_text`}>
                    {short_name}
                    <span className="text-primary">.</span>
                </h1>
            ) : (
                <h1 className={`logo_text`}>
                    Logo
                    <span className="text-primary">.</span>
                </h1>
            )}
        </Link>
    );
}

export function NavBarAndMobileNavToggle() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    // Function to scroll to an element with header offset
    const scrollto = (el) => {
        const header = document.querySelector("#header");
        if (!header) return;

        const offset = header.offsetHeight;
        const element = document.querySelector(el);
        if (!element) return;

        const elementPos = element.offsetTop - 45;
        window.scrollTo({
            top: elementPos - offset,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const navbarlinks = document.querySelectorAll("#navbar .scrollto");

        // Check the scroll position on mount and add the active state event listener
        const navbarlinksActive = () => {
            const position = window.scrollY + 200;
            navbarlinks.forEach(navbarlink => {
                if (!navbarlink.hash) return;
                const section = document.querySelector(navbarlink.hash);
                if (!section) return;
                if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                    navbarlink.classList.add("active");
                } else {
                    navbarlink.classList.remove("active");
                }
            });
        };

        window.addEventListener("load", navbarlinksActive);
        document.addEventListener("scroll", navbarlinksActive);

        // Scroll with offset on links with a class name .scrollto (when a .scrollto link is clicked, that is)
        const handleClick = (e) => {
            const target = e.target;
            if (target.classList.contains("scrollto") && target.hash && document.querySelector(target.hash)) {
                e.preventDefault();
                const navbar = document.querySelector("#navbar");
                if (navbar && navbar.classList.contains("navbar-mobile")) {
                    navbar.classList.remove("navbar-mobile");
                    setIsMobileNavOpen(false);
                }
                scrollto(target.hash);
            }
        };

        document.addEventListener("click", handleClick);

        // Scroll with offset on page load with hash links in the url
        const handlePageLoad = () => {
            if (window.location.hash && document.querySelector(window.location.hash)) {
                scrollto(window.location.hash);
            }
        };

        handlePageLoad();
        window.addEventListener("load", handlePageLoad);

        return () => {
            window.removeEventListener("load", handlePageLoad);
            window.removeEventListener("load", navbarlinksActive);
            document.removeEventListener("scroll", navbarlinksActive);
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const links = [
        { name: "Home", href: "/#hero", icon: "" },
        { name: "About", href: "/#about", icon: "" },
        { name: "Services", href: "/#services", icon: "" },
        { name: "Contact", href: "/#contact", icon: "" },
    ];

    return (
        <nav id="navbar" className={`navbar ${isMobileNavOpen ? "navbar-mobile" : ""}`}>
            <ul>
                {links.map((link) => (
                    <li key={link.name}>
                        <Link
                            href={link.href}
                            className={clsx("nav-link scrollto", {
                                "active": pathname === link.href,
                            })}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mobile-nav-toggle" onClick={toggleMobileNav}>
                {isMobileNavOpen ? <BsX /> : <BsList />}
            </div>
        </nav>
    );
}
