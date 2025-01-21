import type { SectionResponse } from "../types/base";

// utils
export type ToggleAsideAction = "toggle" | "closeOnMobile";

export type NavLinkType =
  | "dropdown"
  | "heading"
  | "login"
  | "logout"
  | "login/logout"
  | "page"
  | "";

export interface NavLink {
  type?: NavLinkType;
  text?: string;
  loginText?: string;
  logoutText?: string;
  icon?: string;
  href?: string;
  authorized?: string[];
  children?: NavLink[];
}

export interface NavLinksMap {
  [key: string]: NavLink[];
}

// api
export interface AboutResponse extends SectionResponse {
  section_instance?: string;
  section_version?: "V1";
  about_content?: string;
  about_image?: string;
  about_video?: string;
  about_alt?: string;
}

export interface CallToActionResponse {
  section_instance?: string;
  section_version?: "V1" | "V2";
  cta_heading?: string;
  cta_paragraph?: string;
  cta_image?: string;
  cta_button_text?: string;
  cta_button_href?: string;
  cta_button_icon?: string;
}

export interface ContactResponse extends SectionResponse {
  section_instance?: string;
  section_version?: "V1" | "V2" | "V3";
  map?: boolean;
}

export interface HeaderHeroResponse {
  section_instance?: string;
  header_background?: "body" | "dark";
  logo_version?: LogoProps["logoVersion"];
  header_nav?: boolean;
  theme_toggler?: boolean;
  hero_heading?: string;
  hero_sub_heading?: string;
  hero_paragraph?: string;
  hero_image?: string;
  hero_button_text?: string;
  hero_button_href?: string;
}

interface Item {
  image?: string | null;
  icon?: string;
  title?: string;
  description?: string;
}

export interface ListResponse extends SectionResponse {
  section_instance?: string;
  section_version?: "V1" | "V2" | "V3";
  items?: Item[];
}

// providers
export interface CoreProps {
  children: React.ReactNode;
}

export interface CoreContext {
  asideExists: boolean;
  setAsideExists: (asideExists: boolean) => void;
  createNavLinks: (config: NavLink[]) => NavLink[];
  isNavModalOpen: boolean;
  setIsNavModalOpen: (isNavModalOpen: boolean) => void;
  navLinksMap: NavLinksMap;
}

// app
export interface AboutProps extends AboutResponse {}
export interface CallToActionProps extends CallToActionResponse {}
export interface ContactProps extends ContactResponse {}

export interface ContactItemProps {
  icon: string;
  title: { V1: string; V2: string; V3: string };
  lines: (string | undefined)[];
  linkPrefix?: string;
}

export interface FooterNavProps {
  links?: NavLink[];
}

export interface BottombarProps {
  themeToggler?: boolean;
}

export interface FooterBottombarProps extends BottombarProps {
  component?: "footerbottombar" | "footer" | "bottombar";
}
export interface HeaderHeroProps extends HeaderHeroResponse {
  component?: "headerhero" | "header" | "hero";
}

export interface HeaderProps extends HeaderHeroResponse {
  headerPosition?: "fixed" | "sticky";
  headerBorder?: boolean;
}

export interface HeaderNavProps {
  linkColor?: string;
}

export interface ModalNavProps {
  toggleColor?: string;
}

export interface HeroProps extends HeaderHeroResponse {}

export interface ListDescriptionsProps extends ListResponse {}

// widgets
export interface NavLinksProps {
  links?: NavLink[];
  layout: "header" | "aside" | "modal";
  renderLink: (link: NavLink, index: number, sharedProps: any) => ReactNode;
  className?: any;
  id?: string;
}
