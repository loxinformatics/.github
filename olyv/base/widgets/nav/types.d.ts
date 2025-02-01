import type { NavlinkDetails } from "../links/types";

export type NavLinkType =
  | "dropdown"
  | "heading"
  | "login"
  | "logout"
  | "login/logout"
  | "page"
  | "";

export interface NavLinksMap {
  [key: string]: NavlinkDetails[];
}

export interface NavProps {
  navlinks?: NavlinkDetails[];
  variant: "Navbar" | "Sidebar" | "Navmodal";
  className?: any;
  id?: string;
  navLinkClass?: string;
  navLinkIconClass?: string;
}

export interface NavmodalProps {
  toggleColor?: string;
  navigation_items?: NavlinkDetails[];
}

export interface NavbarProps {
  linkColor?: string;
  navigation_items?: NavlinkDetails[];
}

export interface FooterNavProps {
  links?: NavlinkDetails[];
}
