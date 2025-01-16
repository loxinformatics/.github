"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../../auth/context";
import useCore from "./hooks";
import styles from "./styles.module.css";
import type { NavLink, NavLinksProps } from "./types";

export const Nav = ({ links, layout, renderLink, className, id }: NavLinksProps) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const handleDropdownClick = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const shouldRenderLink = (link: NavLink) => {
    if (user) {
      if (link.authorized) {
        const isUserOnly = link.authorized.length === 1 && link.authorized.includes("USER");
        if (isUserOnly) return true;

        return link.authorized.some((group) => group !== "USER" && user.groups.includes(group));
      }
    }
    return !link.authorized;
  };

  useEffect(() => {
    const initialOpenDropdowns: { [key: string]: boolean } = {};
    links?.forEach((link, index) => {
      if (link.type === "dropdown") {
        link.children?.forEach((child: NavLink) => {
          if (child.href && pathname === child.href) {
            initialOpenDropdowns[index] = true;
          }
        });
      }
    });
    setOpenDropdowns(initialOpenDropdowns);
  }, [links, pathname]);

  return (
    <nav id={id} className={`${layout === "header" ? "hidden lg:block" : ""} ${className}`}>
      <ul className={layout === "header" ? "flex items-center" : ""}>
        {links?.map((link, index) => {
          if (!shouldRenderLink(link)) return null;
          return renderLink(link, index, {
            shouldRenderLink,
            openDropdowns,
            handleDropdownClick,
            pathname,
            user,
          });
        })}
      </ul>
    </nav>
  );
};

export const AsideToggle = () => {
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
