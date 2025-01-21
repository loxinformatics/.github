"use client";

import { useLayoutEffect } from "react";
import { useCore } from "../../providers/core";
import coreStyles from "../../styles/core.module.css";
import { toggleAside } from "../../utils/core";

export default function AsideToggler() {
  const { asideExists } = useCore();
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
