// rest api
import type { NavigationItem } from "../../widgets/links/types";

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
  navigation_items?: NavigationItem[];
}

// components
export interface HeaderHeroProps extends HeaderHeroResponse {
  component?: "headerhero" | "header" | "hero";
}

export interface HeaderProps extends HeaderHeroResponse {
  headerPosition?: "fixed" | "sticky";
  headerBorder?: boolean;
}

export interface HeaderNavProps {
  linkColor?: string;
  navigation_items?: NavigationItem[];
}

export interface ModalNavProps {
  toggleColor?: string;
  navigation_items?: NavigationItem[];
}

export interface HeroProps extends HeaderHeroResponse {}
