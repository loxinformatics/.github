"use client";

import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import styles from "./navigation.module.css";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useNavigationContext } from "@/components/navigation/context";

const links = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "About", href: "/#about", icon: FaInfoCircle },
  { name: "Services", href: "/#services", icon: FaServicestack },
  { name: "Contact", href: "/#contact", icon: FaEnvelope },
  { name: "Login", href: "/auth", icon: FaLock },
];

function CustomNavLink({ href = "", className, children }) {
  return (
    <Link href={href} passHref className={className}>
      {children}
    </Link>
  );
}

export default function Navigation({ isSidebar = false, isMobileNav = false }) {
  const pathname = usePathname();
  const { isSidebarOpen, isMobileNavOpen, setIsMobileNavOpen } =
    useNavigationContext();
  const [isVisible, setIsVisible] = useState("invisible");

  // Function to scroll to an element with header offset
  const scrollto = (el) => {
    const header = document.querySelector("#header");
    if (!header) return;

    const offset = header.offsetHeight;
    const element = document.querySelector(el);
    if (!element) return;

    const elementPos = element.offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  // Set icons to be visible when sidebar is retracted
  useEffect(() => {
    setIsVisible(isSidebarOpen ? "invisible" : "visible");
  }, [isSidebarOpen]);

  useEffect(() => {
    const navlinks = document.querySelectorAll(".scrollto");

    // Check the scroll position on mount and add the active state event listener
    const navlinksActive = () => {
      const position = window.scrollY + 200;
      navlinks.forEach((navlink) => {
        if (!navlink.hash) return;
        const section = document.querySelector(navlink.hash);
        if (!section) return;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navlink.classList.add(styles.navbarNavLinkActive);
        } else {
          navlink.classList.remove(styles.navbarNavLinkActive);
        }
      });
    };

    window.addEventListener("load", navlinksActive);
    document.addEventListener("scroll", navlinksActive);

    // Scroll with offset on links with a class name .scrollto (when a .scrollto link is clicked, that is)
    const handleClick = (e) => {
      const target = e.target;
      if (
        target.classList.contains("scrollto") &&
        target.hash &&
        document.querySelector(target.hash)
      ) {
        e.preventDefault();
        isMobileNavOpen && setIsMobileNavOpen(false);
        scrollto(target.hash);
      }
    };

    document.addEventListener("click", handleClick);

    // Scroll with offset on page load with hash links in the url
    const handlePageLoad = () => {
      if (
        window.location.hash &&
        document.querySelector(window.location.hash)
      ) {
        scrollto(window.location.hash);
      }
    };

    handlePageLoad();
    window.addEventListener("load", handlePageLoad);

    return () => {
      window.removeEventListener("load", handlePageLoad);
      window.removeEventListener("load", navlinksActive);
      document.removeEventListener("scroll", navlinksActive);
      document.removeEventListener("click", handleClick);
    };
  }, [isMobileNavOpen, setIsMobileNavOpen]);

  return (
    <>
      {links.map((link, index) => {
        const Icon = link?.icon;
        return isSidebar ? (
          <Nav.Link
            as={() => (
              <CustomNavLink
                href={link?.href}
                className={`list-group-item list-group-item-action scrollto ${
                  styles.sidebarNavLink
                } ${pathname === link?.href && styles.sidebarNavLinkActive}`}
              >
                {Icon && <Icon className={styles.sidebarNavIcon} />}{" "}
                {link?.name}{" "}
                {Icon && (
                  <Icon
                    className={`${styles.sidebarNavIcon} ${isVisible} ms-auto`}
                    style={{ marginRight: "-2px" }}
                  />
                )}
              </CustomNavLink>
            )}
            key={index}
          />
        ) : isMobileNav ? (
          <li key={link?.name}>
            <CustomNavLink
              href={link?.href}
              className={`scrollto nav-link ${styles.mobileNavLink} ${
                pathname === link?.href && styles.mobileNavLinkActive
              }`}
            >
              {link?.name}
            </CustomNavLink>
          </li>
        ) : (
          <li key={link?.name} className={`position-relative`}>
            <CustomNavLink
              href={link?.href}
              className={`scrollto ${styles.navbarNavLink} ${
                pathname === link?.href && styles.navbarNavLinkActive
              }`}
            >
              {Icon && <Icon className={styles.navbarNavIcon} />} {link?.name}
            </CustomNavLink>
          </li>
        );
      })}
    </>
  );
}
