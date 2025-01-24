import type { NavLink, NavLinkType } from "../types/base";

export const apiURL =
  `${process.env.NEXT_PUBLIC_API_PROTOCOL || "http"}://` +
  `${process.env.NEXT_PUBLIC_API_HOST?.replace(/\/+$/, "") || "localhost"}` +
  `${
    process.env.NEXT_PUBLIC_API_PORT
      ? ":" + process.env.NEXT_PUBLIC_API_PORT
      : ""
  }` +
  `${
    !!process.env.NEXT_PUBLIC_API_BASEPATH
      ? "/" + process.env.NEXT_PUBLIC_API_BASEPATH.replace(/^\/+|\/+$/g, "")
      : ""
  }`;

export const baseApiURL = `${apiURL}/base`;
export const homeURL = process.env.NEXT_PUBLIC_HOME_URL || "/";

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
