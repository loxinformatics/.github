"use client";

import { useLayoutEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useBase } from "../../context/base";
import { useCore } from "../../context/core";
import coreStyles from "../../styles/core.module.css";
import type { NavLink } from "../../types/core";
import { Anchor, Nav } from "../../widgets/base";

export default function SidebarSection() {
  const [top, setTop] = useState<number>(0);
  const { textColorHover, textColorGroupHover, textPrimary } = useBase();
  const { loginURL, logoutURL } = useAuth();
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

  const DropdownNavLink = ({
    link,
    index,
    openDropdowns,
    handleDropdownClick,
    pathname,
    shouldRenderLink,
  }: any) => {
    const visibleChildren = link.children?.filter(shouldRenderLink);

    if (!visibleChildren || visibleChildren.length === 0) return null;

    return (
      <li key={`dropdown-${index}`} className={coreStyles.nav_item}>
        <a
          className={`group ${coreStyles.nav_link} ${textColorHover}
          bg-body-secondary dark:bg-body-secondary-reverse
          hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse ${
            visibleChildren.some((child: any) => child.href === pathname)
              ? coreStyles.active
              : ""
          }`}
          onClick={() => handleDropdownClick(String(index))}
          aria-controls={`dropdown-${index}`}
          aria-expanded={openDropdowns[String(index)] || false}
          href="#"
        >
          {link.icon && (
            <i className={`${link.icon} ${textColorGroupHover}`}></i>
          )}
          {link.text && <span>{link.text}</span>}
          <i
            className={`bi bi-chevron-down ms-auto ${textColorGroupHover} ${coreStyles.dropdown_icon} me-0`}
          ></i>
        </a>
        <ul
          id={`dropdown-${index}`}
          className={`${coreStyles.nav_content} ${
            openDropdowns[String(index)]
              ? coreStyles.openDropdown
              : coreStyles.closedDropdown
          }`}
        >
          {visibleChildren.map((child: any, childIndex: any) => (
            <li
              key={`child-${index}-${childIndex}`}
              className={child.href === pathname ? coreStyles.active : ""}
            >
              <Anchor
                href={child.href || "#"}
                className={`group ${coreStyles.nav_link} ${textColorHover} ${
                  child.href === pathname && textPrimary
                } nested`} //* the nested class is needed for proper toggling open or close the aside component
              >
                <i className={`bi bi-circle ${textColorGroupHover}`}></i>
                {child.text && <span>{child.text}</span>}
              </Anchor>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  const HeadingNavLink = ({ link, index }: any) => {
    return (
      <li
        key={`heading-${index}`}
        className={`${coreStyles.nav_heading} text-color-secondary dark:text-color-secondary-reverse`}
      >
        {link.text}
      </li>
    );
  };

  const LoginNavLink = ({ link, pathname }: any) => {
    const nextUrl = encodeURIComponent(pathname);
    return (
      <li className={coreStyles.nav_item}>
        <Anchor
          href={`${loginURL}/?nextUrl=${nextUrl}&callbackUrl=${pathname}`}
          className={`group ${coreStyles.nav_link} bg-body-secondary dark:bg-body-secondary-reverse ${textColorHover} hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse`}
        >
          {link.icon && (
            <i className={`${link.icon} ${textColorGroupHover}`}></i>
          )}
          {link.text || link.loginText ? (
            <span>{link.loginText || link.text}</span>
          ) : null}
          <i
            className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
          ></i>
        </Anchor>
      </li>
    );
  };

  const LogoutNavLink = ({ link, pathname }: any) => {
    return (
      <li className={coreStyles.nav_item}>
        <Anchor
          href={`${logoutURL}?callbackUrl=${pathname}`}
          className={`group ${coreStyles.nav_link} bg-body-secondary dark:bg-body-secondary-reverse ${textColorHover} hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse`}
        >
          {link.icon && (
            <i className={`${link.icon} ${textColorGroupHover}`}></i>
          )}
          {link.text || link.logoutText ? (
            <span>{link.logoutText || link.text}</span>
          ) : null}
          <i
            className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
          ></i>
        </Anchor>
      </li>
    );
  };

  const LoginLogoutNavLink = ({ link, user, pathname }: any) => {
    const isAuthenticated = !!user;
    if (isAuthenticated) {
      return <LogoutNavLink link={link} pathname={pathname} />;
    } else {
      return <LoginNavLink link={link} pathname={pathname} />;
    }
  };

  const PageNavLink = ({ link, pathname }: any) => {
    return (
      <li className={coreStyles.nav_item}>
        <Anchor
          href={link.href || "#"}
          className={`group ${coreStyles.nav_link}
          ${textColorHover} 
          bg-body-secondary dark:bg-body-secondary-reverse
          hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse
          ${link.href === pathname ? coreStyles.active : ""}`}
        >
          {link.icon && (
            <i className={`${link.icon} ${textColorGroupHover}`}></i>
          )}
          {link.text && <span>{link.text}</span>}
          <i
            className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
          ></i>
        </Anchor>
      </li>
    );
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
        className={coreStyles.aside_nav}
        links={navLinks}
        layout="aside"
        renderLink={renderLink}
      />
    </aside>
  );
}
