"use client";

import { useBase } from "../../../app";
import Heading from "../../text/Heading";
import Link from "../Link";
import styles from "./styles.module.css";

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
    <li key={`dropdown-${index}`} className={styles.sidebarlink}>
      <a
        className={`group ${styles.nav_link} ${textColorHover}
          cursor-pointer
          bg-body-secondary dark:bg-body-secondary-reverse
          hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse ${
            visibleChildren.some((child: any) => child.href === pathname)
              ? styles.active
              : ""
          }`}
        onClick={() => handleDropdownClick(String(index))}
        aria-controls={`dropdown-${index}`}
        aria-expanded={openDropdowns[String(index)] || false}
      >
        {link.icon && <i className={`${link.icon} ${textColorGroupHover}`}></i>}
        {link.text && <span>{link.text}</span>}
        <i
          className={`bi bi-chevron-down ms-auto ${textColorGroupHover} ${styles.dropdown_icon} me-0`}
        ></i>
      </a>
      <ul
        id={`dropdown-${index}`}
        className={`${styles.nav_content} ${
          openDropdowns[String(index)]
            ? styles.open_dropdown
            : styles.closed_dropdown
        }`}
      >
        {visibleChildren.map((child: any, childIndex: any) => (
          <li
            key={`child-${index}-${childIndex}`}
            className={child.href === pathname ? styles.active : ""}
          >
            <Link
              href={child.href || "#"}
              className={`group ${styles.nav_link} ${textColorHover} ${
                child.href === pathname && textPrimary
              } nested`} //* the nested class is needed for proper toggling open or close the aside component
            >
              <i className={`bi bi-dash ${textColorGroupHover}`}></i>
              {child.text && <span>{child.text}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function HeadingNavLink({ link, index }: any) {
  return (
    <li key={`heading-${index}`}>
      <Heading variant="h6" className={`uppercase ${styles.sidebarheading}`}>
        {link.text}
      </Heading>
    </li>
  );
}

export function LoginNavLink({ link, pathname }: any) {
  const { textColorHover, textColorGroupHover } = useBase();
  const nextUrl = encodeURIComponent(pathname);

  return (
    <li className={styles.sidebarlink}>
      <Link
        href={`/auth/login/?nextUrl=${nextUrl}&callbackUrl=${pathname}`}
        className={`group ${styles.nav_link} bg-body-secondary dark:bg-body-secondary-reverse ${textColorHover} hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse`}
      >
        {link.icon && <i className={`${link.icon} ${textColorGroupHover}`}></i>}
        {link.text || link.loginText ? (
          <span>{link.loginText || link.text}</span>
        ) : null}
        <i
          className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
        ></i>
      </Link>
    </li>
  );
}

export function LogoutNavLink({ link, pathname }: any) {
  const { textColorHover, textColorGroupHover } = useBase();

  return (
    <li className={styles.sidebarlink}>
      <Link
        href={`/auth/logout?callbackUrl=${pathname}`}
        className={`group ${styles.nav_link} bg-body-secondary dark:bg-body-secondary-reverse ${textColorHover} hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse`}
      >
        {link.icon && <i className={`${link.icon} ${textColorGroupHover}`}></i>}
        {link.text || link.logoutText ? (
          <span>{link.logoutText || link.text}</span>
        ) : null}
        <i
          className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
        ></i>
      </Link>
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
    <li className={styles.sidebarlink}>
      <Link
        href={link.href || "#"}
        className={`group ${styles.nav_link}
          ${textColorHover} 
          bg-body-secondary dark:bg-body-secondary-reverse
          hover:bg-body-tertiary dark:hover:bg-body-tertiary-reverse
          ${link.href === pathname ? styles.active : ""}`}
      >
        {link.icon && <i className={`${link.icon} ${textColorGroupHover}`}></i>}
        {link.text && <span>{link.text}</span>}
        <i
          className={`bi bi-chevron-right ${textColorGroupHover} ms-auto me-0`}
        ></i>
      </Link>
    </li>
  );
}
