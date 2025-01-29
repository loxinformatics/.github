"use client";

import { useLayoutEffect, useState } from "react";
import { useBase } from "../../context";
import { createNavLinks } from "../../utils";
import Nav from "../../widgets/links/Nav";

import baseStyles from "./styles.module.css";

export default function SidebarSection() {
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
        ${baseStyles.sidebar} z-20 w-[300px] p-[20px]
        fixed start-0 bottom-0 overflow-y-auto
        bg-body dark:bg-body-reverse
        shadow-lg shadow-color/40 dark:shadow-color-reverse/40
      `}
      style={{ top: `${top}px` }}
    >
      <Nav
        id="aside-nav"
        layout="sidebar"
        className={`text-sm tracking-wider ${baseStyles.aside_nav}`}
        navlinks={navLinks}
      />
    </aside>
  );
}
