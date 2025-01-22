"use client";

import { useLayoutEffect } from "react";
import { useCore } from "../../context/core";
import coreStyles from "../../styles/core.module.css";

export default function SidebarToggler() {
  const { asideExists, toggleAside } = useCore();

  useLayoutEffect(() => {
    if (!asideExists) return;

    const aside = document.querySelector("aside");
    const main = document.querySelector<HTMLElement>("main");

    aside?.classList.add(coreStyles.aside);
    main?.classList.add(coreStyles.main);

    return () => {
      aside?.classList.remove(coreStyles.aside);
      main?.classList.remove(coreStyles.main);
    };
  }, [asideExists]);

  return (
    asideExists && (
      <i
        id="aside-toggle"
        className="bi bi-list cursor-pointer text-[32px] pl-[10px]"
        onClick={() => toggleAside()}
      ></i>
    )
  );
}
