import type { NavigationItem } from "../links/types";

export type NavLinkType =
  | "dropdown"
  | "heading"
  | "login"
  | "logout"
  | "login/logout"
  | "page"
  | "";

export interface NavLinksMap {
  [key: string]: NavigationItem[];
}

export interface NavProps {
  navlinks?: NavigationItem[];
  variant: "Navbar" | "sidebar" | "Navmodal";
  className?: any;
  id?: string;
  navLinkClass?: string;
  navLinkIconClass?: string;
}

export interface NavmodalProps {
  toggleColor?: string;
  navigation_items?: NavigationItem[];
}

export interface NavbarProps {
  linkColor?: string;
  navigation_items?: NavigationItem[];
}

export interface FooterNavProps {
  links?: NavigationItem[];
}
