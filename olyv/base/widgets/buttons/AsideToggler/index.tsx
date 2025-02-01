"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useBase } from "../../../app";
import styles from "./styles.module.css";

export default function AsideToggler() {
  const {
    asideExists,
    isAsideOpen: isSidebarOpen,
    setIsAsideOpen: setIsSidebarOpen,
  } = useBase();
  const isFirstRender = useRef(true);

  const toggleAsideClass = (add: boolean, isMobile: boolean) => {
    const method = add ? "add" : "remove";
    document.body.classList[method](styles.toggle_aside);
    if (!isMobile) {
      document.body.classList[add ? "remove" : "add"](styles.toggle_aside);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1199.98px)");

    if (isFirstRender.current) {
      isFirstRender.current = false;
      const isMobile = mediaQuery.matches;
      if (!isMobile) {
        toggleAsideClass(true, isMobile); // Open aside section on larger screens
        setIsSidebarOpen(true);
      }
    }

    const toggleAside = () => {
      const isMobile = mediaQuery.matches; // Re-evaluate `isMobile` dynamically
      if (isSidebarOpen) {
        toggleAsideClass(true, isMobile);
      } else {
        toggleAsideClass(false, isMobile);
      }
    };

    window.addEventListener("resize", toggleAside);
    toggleAside();

    return () => {
      // Cleanup event listener
      window.removeEventListener("resize", toggleAside);
    };
  }, [isSidebarOpen]);

  useLayoutEffect(() => {
    if (!asideExists) return;

    const aside = document.querySelector("aside");
    const main = document.querySelector<HTMLElement>("main");

    aside?.classList.add(styles.aside);
    main?.classList.add(styles.main);

    return () => {
      aside?.classList.remove(styles.aside);
      main?.classList.remove(styles.main);
    };
  }, [asideExists]);

  return (
    asideExists && (
      <i
        className="bi bi-list cursor-pointer text-[32px] pl-[10px]"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    )
  );
}
