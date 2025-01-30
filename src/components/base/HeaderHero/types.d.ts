// rest api
import type { NavbarProps, NavmodalProps } from "../widgets/nav/types";

export interface HeaderHero {
  section_instance?: string;
  header_background?: "body" | "dark";
  logo_version?: LogoProps["logoVersion"];
  theme_toggler?: boolean;
  hero_heading?: string;
  hero_sub_heading?: string;
  hero_paragraph?: string;
  hero_image?: string;
  hero_button_text?: string;
  hero_button_href?: string;
  navigation_items?:
    | NavbarProps["navigation_items"]
    | NavmodalProps["navigation_items"];
}
