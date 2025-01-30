"use client";

import { useMemo } from "react";
import { useBase } from "../../base/management/context";
import Nav from "./Nav";
import styles from "./styles.module.css";
import type { NavbarProps } from "./types";

export default function Navbar({ linkColor, navigation_items }: NavbarProps) {
  const { textColorHover } = useBase();
  const filteredNavItems = useMemo(
    () =>
      navigation_items?.filter(
        (item) => !item.type || item.type === "normal"
      ) ?? [],
    [navigation_items]
  );

  const navLinks_color = linkColor || "text-color-reverse dark:text-color";

  return (
    <Nav
      variant="Navbar"
      className={`text-sm tracking-wider ${styles.navbar}`}
      navlinks={filteredNavItems}
      navLinkClass={`${navLinks_color} ${styles.navlink} ${textColorHover}`}
      navLinkIconClass={styles.navlinkIcon}
    />
  );
}
