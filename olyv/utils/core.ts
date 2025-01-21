import coreStyles from "../styles/core.module.css";
import type { NavLink, NavLinkType, ToggleAsideAction } from "../types/core";
import { apiURL } from "./base";

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
        document.body.classList.contains(coreStyles.toggle_aside)
      ) {
        document.body.classList.remove(coreStyles.toggle_aside);
      }
      break;

    case "toggle":
    default:
      document.body.classList.toggle(coreStyles.toggle_aside);
      break;
  }
};

export const coreApiURL = `${apiURL}/core`;
