"use client";

import { useLayoutEffect, useState } from "react";
import { useCore } from "../../context/core";
import coreStyles from "../../styles/core.module.css";
import type { NavLink } from "../../types/core";
import Nav from "../../widgets/base/Nav";
import {
  DropdownNavLink,
  HeadingNavLink,
  LoginLogoutNavLink,
  LoginNavLink,
  LogoutNavLink,
  PageNavLink,
} from "../../widgets/base/SidebarLinks";

export default function SidebarSection() {
  const [top, setTop] = useState<number>(0);

  const { setAsideExists, createNavLinks, navLinksMap } = useCore();

  const navLinks = createNavLinks(navLinksMap.aside);

  useLayoutEffect(() => {
    setAsideExists(true);

    const header = document.querySelector<HTMLElement>("header");
    setTop(header ? header.offsetHeight : 0);

    return () => {
      setAsideExists(false);
    };
  }, []);

  const renderLink = (
    link: NavLink,
    index: number,
    {
      shouldRenderLink,
      openDropdowns,
      handleDropdownClick,
      pathname,
      user,
    }: any
  ) => {
    switch (link.type) {
      case "dropdown":
        return (
          <DropdownNavLink
            key={index}
            link={link}
            index={index}
            shouldRenderLink={shouldRenderLink}
            pathname={pathname}
            openDropdowns={openDropdowns}
            handleDropdownClick={handleDropdownClick}
          />
        );
      case "heading":
        return <HeadingNavLink key={index} link={link} />;
      case "login":
        return <LoginNavLink key={index} link={link} pathname={pathname} />;
      case "logout":
        return <LogoutNavLink key={index} link={link} pathname={pathname} />;
      case "login/logout":
        return (
          <LoginLogoutNavLink
            key={index}
            user={user}
            link={link}
            pathname={pathname}
          />
        );
      default:
        return <PageNavLink key={index} link={link} pathname={pathname} />;
    }
  };

  return (
    <aside
      id="aside"
      className={`
        ${coreStyles.sidebar} z-20 w-[300px] p-[20px]
        fixed start-0 bottom-0 overflow-y-auto
        bg-body dark:bg-body-reverse
        shadow-lg shadow-color/40 dark:shadow-color-reverse/40
      `}
      style={{ top: `${top}px` }}
    >
      <Nav
        id="aside-nav"
        className={`text-sm tracking-wider ${coreStyles.aside_nav}`}
        links={navLinks}
        layout="aside"
        renderLink={renderLink}
      />
    </aside>
  );
}
