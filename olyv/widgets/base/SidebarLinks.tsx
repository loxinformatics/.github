"use client";

import { useAuth } from "../../context/auth";
import { useBase } from "../../context/base";
import coreStyles from "../../styles/core.module.css";
import Anchor from "./Anchor";
import Heading from "./Heading";

export function DropdownNavLink({
  link,
  index,
  openDropdowns,
  handleDropdownClick,
  pathname,
  shouldRenderLink,
}: any) {
  const { textColorHover, textColorGroupHover, textPrimary } = useBase();

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
        {link.icon && <i className={`${link.icon} ${textColorGroupHover}`}></i>}
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
              <i className={`bi bi-dash ${textColorGroupHover}`}></i>
              {child.text && <span>{child.text}</span>}
            </Anchor>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function HeadingNavLink({ link, index }: any) {
  return (
    <li key={`heading-${index}`}>
      <Heading variant="h6" className={`uppercase ${coreStyles.nav_heading}`}>
        {link.text}
      </Heading>
    </li>
  );
}

export function LoginNavLink({ link, pathname }: any) {
  const { textColorHover, textColorGroupHover } = useBase();
  const { loginURL } = useAuth();
  const nextUrl = encodeURIComponent(pathname);

  return (
    <li className={coreStyles.nav_item}>
      <Anchor
        href={`${loginURL}/?nextUrl=${nextUrl}&callbackUrl=${pathname}`}
        className={`group ${coreStyles.nav_link} bg-body-secondary dark:bg-body-secondary-reverse ${textColorHover} hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse`}
      >
        {link.icon && <i className={`${link.icon} ${textColorGroupHover}`}></i>}
        {link.text || link.loginText ? (
          <span>{link.loginText || link.text}</span>
        ) : null}
        <i
          className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
        ></i>
      </Anchor>
    </li>
  );
}

export function LogoutNavLink({ link, pathname }: any) {
  const { textColorHover, textColorGroupHover } = useBase();
  const { logoutURL } = useAuth();

  return (
    <li className={coreStyles.nav_item}>
      <Anchor
        href={`${logoutURL}?callbackUrl=${pathname}`}
        className={`group ${coreStyles.nav_link} bg-body-secondary dark:bg-body-secondary-reverse ${textColorHover} hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse`}
      >
        {link.icon && <i className={`${link.icon} ${textColorGroupHover}`}></i>}
        {link.text || link.logoutText ? (
          <span>{link.logoutText || link.text}</span>
        ) : null}
        <i
          className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
        ></i>
      </Anchor>
    </li>
  );
}

export function LoginLogoutNavLink({ link, user, pathname }: any) {
  const isAuthenticated = !!user;
  if (isAuthenticated) {
    return <LogoutNavLink link={link} pathname={pathname} />;
  } else {
    return <LoginNavLink link={link} pathname={pathname} />;
  }
}

export function PageNavLink({ link, pathname }: any) {
  const { textColorHover, textColorGroupHover } = useBase();

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
        {link.icon && <i className={`${link.icon} ${textColorGroupHover}`}></i>}
        {link.text && <span>{link.text}</span>}
        <i
          className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
        ></i>
      </Anchor>
    </li>
  );
}
