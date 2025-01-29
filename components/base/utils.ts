import type { NavLink, NavLinkType } from "./types";

export const baseApiURL = `${process.env.REST_URL}/base`;

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
