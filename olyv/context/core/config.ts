import { apiURL } from "../base/config";
import styles from "./styles.module.css";
import type { NavLink, NavLinkType, ToggleAsideAction } from "./types";

// * this depends on header, hence it's a Core util, and not a Base util
export const scroll_to = (el: string) => {
  const header: HTMLElement | null =
    document.querySelector<HTMLElement>('[id^="header_"]');
  const element = document.querySelector<HTMLElement>(el);
  const offset = header?.offsetHeight || 0;
  const elementPos = element?.offsetTop || 0;
  const currentScrollPos = window.scrollY || document.documentElement.scrollTop;

  if (Math.abs(currentScrollPos - (elementPos - offset)) > 1) {
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  }
};

export const createNavDropdown = (children: NavLink[]): NavLink[] => {
  return children.filter((child) => {
    // Filter out invalid types
    const invalidTypes: NavLinkType[] = [
      "login",
      "logout",
      "login/logout",
      "heading",
      "dropdown",
    ];
    return !invalidTypes.includes(child.type || "");
  });
};

export const createNavLinks = (config: NavLink[]): NavLink[] => {
  const createNav = ({
    type,
    authorized,
    href,
    text,
    icon,
    loginText,
    logoutText,
    children,
  }: NavLink): NavLink => {
    // If 'authorized' is provided, ensure "USER" is always included if other roles are present
    if (authorized && authorized.length > 0) {
      if (!authorized.includes("USER")) {
        authorized.push("USER");
      }
    }

    return {
      type,
      authorized,
      href,
      text,
      icon,
      loginText,
      logoutText,
      children,
    };
  };

  return config.map((link: NavLink) => createNav(link));
};

export const toggleAside = (action: ToggleAsideAction = "toggle") => {
  const mediaQuery = window.matchMedia("(max-width: 1199.98px)");

  switch (action) {
    case "closeOnMobile":
      // * will only toggle aside on mobile devices
      if (
        mediaQuery.matches &&
        document.body.classList.contains(styles.toggle_aside)
      ) {
        document.body.classList.remove(styles.toggle_aside);
      }
      break;

    case "toggle":
    default:
      document.body.classList.toggle(styles.toggle_aside);
      break;
  }
};

export const coreApiURL = `${apiURL}/core`;
