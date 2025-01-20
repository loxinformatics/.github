"use client";

import { useLayoutEffect } from "react";
import { useCore } from "../..";
import styles from "../../styles.module.css";

const AsideToggler = () => {
  const { asideExists, toggleAside } = useCore();
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
        id="aside-toggle"
        className="bi bi-list cursor-pointer text-[32px] pl-[10px]"
        onClick={() => toggleAside()}
      ></i>
    )
  );
};

export default AsideToggler;
