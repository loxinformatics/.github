"use client";

import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import styles from "./NavLinks.module.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRootContext } from "@/app/context";

export default function NavLinks({
  inNavbar = true,
  inSidebar = false,
  inMobileNav = false,
}) {
  const { navbarAndMobileLinks, sidebarLinks, isSidebarOpen, isMobileNavOpen, setIsMobileNavOpen } =
    useRootContext();
  const [isVisible, setIsVisible] = useState("invisible");
  const pathname = usePathname();

  const navlinks = inSidebar ? sidebarLinks : navbarAndMobileLinks;

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

  // Check the scroll position on mount and add the active state event listener on navbar links
  useEffect(() => {
    const navbarlinks = document.querySelectorAll("#navbar .scrollto");
    const navbarlinksActive = () => {
      const position = window.scrollY + 200;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        const section = document.querySelector(navbarlink.hash);
        if (!section) return;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navbarlink.classList.add(styles.navbarNavLinkActive);
        } else {
          navbarlink.classList.remove(styles.navbarNavLinkActive);
        }
      });
    };

    window.addEventListener("load", navbarlinksActive);
    document.addEventListener("scroll", navbarlinksActive);
    return () => {
      window.removeEventListener("load", navbarlinksActive);
      document.removeEventListener("scroll", navbarlinksActive);
    };
  }, []);

  // Scroll with offset on links with a class name .scrollto (when a .scrollto link is clicked, that is)
  useEffect(() => {
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
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isMobileNavOpen, setIsMobileNavOpen]);

  // Scroll with offset on page load with hash links in the url
  useEffect(() => {
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
    };
  }, []);

  // Set icons to be visible when sidebar is retracted
  useEffect(() => {
    setIsVisible(isSidebarOpen ? "invisible" : "visible");
  }, [isSidebarOpen]);

  return (
    <>
      {navlinks.map((link, index) => {
        const Icon = link?.icon;
        // in Sidebar
        return inSidebar ? (
          <Nav.Link
            as={() => (
              <CustomNavLink
                href={link?.href}
                className={`list-group-item list-group-item-action scrollto ${styles.sidebarNavLink
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
        ) : // in Mobile Nav
          inMobileNav ? (
            <li key={link?.name}>
              <CustomNavLink
                href={link?.href}
                className={`scrollto nav-link ${styles.mobileNavLink}`}
              >
                {Icon && <Icon className={styles.mobileNavIcon} />} {link?.name}
              </CustomNavLink>
            </li>
          ) : // in Navbar
            inNavbar ? (
              <li key={link?.name} className={`position-relative`}>
                <CustomNavLink
                  href={link?.href}
                  className={`scrollto ${styles.navbarNavLink}`}
                >
                  {Icon && <Icon className={styles.navbarNavIcon} />} {link?.name}
                </CustomNavLink>
              </li>
            ) : (
              <></>
            );
      })}
    </>
  );
}

function CustomNavLink({ href = "", className, children }) {
  return (
    <Link href={href} passHref className={className}>
      {children}
    </Link>
  );
}
