// utis & actions
export interface HeaderHeroData {
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

// components
export interface HeaderHeroProps extends HeaderHeroData {
  component?: "headerhero" | "header" | "hero";
}

export interface HeaderProps extends HeaderHeroData {
  headerPosition?: "fixed" | "sticky";
  headerBorder?: boolean;
}

export interface HeaderNavProps {
  linkColor?: string;
}

export interface ModalNavProps {
  toggleColor?: string;
}

export interface HeroProps extends HeaderHeroData {}
