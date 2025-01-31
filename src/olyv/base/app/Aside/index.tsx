"use client";

import { useLayoutEffect, useState } from "react";
import { useBase } from "../../app";
import Nav from "../../widgets/nav/Nav";
import { createNavLinks } from "../../widgets/nav/utils";
import styles from "./styles.module.css";

export default function Sidebar() {
  const [top, setTop] = useState<number>(0);
  const { setAsideExists, navLinksMap } = useBase();
  const navLinks = createNavLinks(navLinksMap.sidebar);

  useLayoutEffect(() => {
    setAsideExists(true);

    const header = document.querySelector<HTMLElement>("header");
    setTop(header ? header.offsetHeight : 0);

    return () => {
      setAsideExists(false);
    };
  }, []);

  return (
    <aside
      id="aside"
      className={`
        ${styles.aside} z-20 w-[300px] p-[20px]
        fixed start-0 bottom-0 overflow-y-auto
        bg-body dark:bg-body-reverse
        shadow-lg shadow-color/40 dark:shadow-color-reverse/40
      `}
      style={{ top: `${top}px` }}
    >
      <Nav
        id="aside-nav"
        variant="Sidebar"
        className={`text-sm tracking-wider ${styles.aside_nav}`}
        navlinks={navLinks}
      />
    </aside>
  );
}
