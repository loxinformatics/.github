"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useAsideContext } from "../../layout/Aside/context";
import navlinks from "./links";
import style from "./Navigation.module.css";

export default function Navigation({ type }) {
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const pathname = usePathname();
  const { isAsideOpen } = useAsideContext();

  // Function to scroll to an element with header offset
  const scrollto = (el) => {
    const header = document.querySelector("#header");
    const element = document.querySelector(el);
    const offset = header?.offsetHeight || 0;
    const elementPos = element?.offsetTop || 0;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  // Close mobile nav and scroll with offset when a hash link (which have .scrollto) is clicked or ...
  // ... close mobile nav when a link which is not a hash link is clicked
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      if (
        target.classList.contains("scrollto") &&
        target.hash &&
        document.querySelector(target.hash)
      ) {
        // Close mobile nav and scroll with offset when a hash link (which have .scrollto) is clicked
        e.preventDefault();
        isNavModalOpen && setIsNavModalOpen(false);
        scrollto(target.hash);
      } else if (target.tagName === "A") {
        // Also close mobile nav when a link which is not a hash link is clicked
        isNavModalOpen && setIsNavModalOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isNavModalOpen]);

  // Hide themetogglerBtn from appearing over close buttom when mobile nav is open
  useEffect(() => {
    const themetogglerBtnElement = document.querySelector("#themeTogglerBtn");
    isNavModalOpen
      ? themetogglerBtnElement?.classList.add("d-none")
      : themetogglerBtnElement?.classList.remove("d-none");
    return () => {
      themetogglerBtnElement?.classList.remove("d-none");
    };
  }, [isNavModalOpen]);

  // Set active state navbar links on scroll position
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
          navbarlink.classList.add(style.navbarNavLinkActive);
        } else {
          navbarlink.classList.remove(style.navbarNavLinkActive);
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

  switch (type) {
    case "mobile":
      return (
        <nav
          id="navbar-mobile"
          className={` ${
            isNavModalOpen &&
            `${style.navbarMobile} position-fixed overflow-hidden top-0 end-0 bottom-0 start-0`
          }`}
        >
          <ul
            className={`${style.ul} ${isNavModalOpen ? "d-block" : "d-none"}`}
          >
            {navlinks.header.map((link) => {
              const Icon = link?.icon;
              return (
                <li key={link?.name}>
                  <Link
                    href={link?.href}
                    className={`${link?.hashlink && "scrollto"} nav-link ${
                      style.navLink
                    }`}
                  >
                    {Icon && <i className={`${Icon} ${style.navIcon}`}></i>}{" "}
                    {link?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            className={`btn z-3`}
            onClick={() => {
              setIsNavModalOpen(!isNavModalOpen);
            }}
          >
            {isNavModalOpen ? (
              <i
                className={`bi bi-x ${style.toggle} ${style.toggleWhenMobileNavIsOpen}`}
              ></i>
            ) : (
              <i className={`bi bi-list ${style.toggle}`}></i>
            )}
          </button>
        </nav>
      );

    case "header":
      return (
        <nav id="navbar" className={`navbar p-0`}>
          <ul className={`p-0 m-0 d-flex list-unstyled align-items-center`}>
            {navlinks.header.map((link, index) => {
              const Icon = link?.icon;
              return (
                <li key={link?.name} className={`position-relative`}>
                  <Link
                    href={link?.href}
                    className={`${link?.hashlink && "scrollto"} ${
                      style["navbarNavLink"]
                    }`}
                  >
                    {Icon && (
                      <i className={` ${Icon} ${style["navbarNavIcon"]}`}></i>
                    )}{" "}
                    {link?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      );

    case "aside":
      return (
        <Nav className="d-flex flex-column">
          {navlinks.aside.map((link) => {
            const icon = link?.icon;
            return (
              <Nav.Link
                key={link?.name}
                as={() => (
                  <Link
                    href={link?.href}
                    className={`list-group-item list-group-item-action scrollto ${
                      style.sidebarNavLink
                    } ${pathname === link?.href && style.sidebarNavLinkActive}`}
                  >
                    {icon && (
                      <i className={`${icon} ${style["asideNavIcon"]}`}></i>
                    )}{" "}
                    {link?.name}{" "}
                    {icon && !isAsideOpen && (
                      <i
                        className={`${icon} ${style["retractedIcon"]} ms-auto`}
                      ></i>
                    )}
                  </Link>
                )}
              />
            );
          })}
        </Nav>
      );

    default:
      return null;
  }
}
