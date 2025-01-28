// utils
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
export interface DataRequestOptions {
  endpoint: string;
  extra_action?: string;
  revalidate?: number;
}

export interface BaseResponse {
  csrf_token?: string;
  full_name?: string;
  short_name?: string;
  motto_description?: string;
  primary_color?: string;
  colored_logo_full_image?: string;
  colored_logo_mini_image?: string;
  light_logo_full_image?: string;
  light_logo_mini_image?: string;
  dark_logo_full_image?: string;
  dark_logo_mini_image?: string;
  primary_phone?: string;
  secondary_phone?: string;
  primary_email?: string;
  secondary_email?: string;
  city_name?: string;
  PO_box?: string;
  street_address?: string;
  social_media_links_version?: "V1" | "V2" | "V3";
  facebook_URL?: string;
  instagram_URL?: string;
  X_URL?: string;
  linkedin_URL?: string;
  spotify_URL?: string;
}

export interface MetadataResponse {
  full_name?: string;
  motto_description?: string;
  website_URL?: string;
  favicon_image?: string;
  apple_image?: string;
  og_image?: string;
  X_image?: string;
}

export interface ManifestResponse {
  full_name?: string;
  short_name?: string;
  motto_description?: string;
  pwa_192_image?: string;
  pwa_512_image?: string;
  apple_image?: string;
}

interface SuccessResponse {
  success: true;
  message: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  error: string;
}

export type FormResponse = SuccessResponse | ErrorResponse;

export interface MailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  endpoint: string;
}

export interface SectionResponse {
  title_h2?: string;
  title_h3?: string;
  title_p?: string;
  title_version?: "V1" | "V2" | "V3";
}

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
  open_days?: string;
  open_hours?: string;
  map_URL?: string;
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
export interface BaseProps extends BaseResponse {
  children: React.ReactNode;
}

export type ThemeColorKey = "#e84545";

export interface BaseContext {
  csrfToken: BaseResponse["csrf_token"];
  fullName: BaseResponse["full_name"];
  shortName: BaseResponse["short_name"];
  motto: BaseResponse["motto_description"];
  primaryColor: BaseResponse["primary_color"];
  textColorHover: string;
  textColorGroupHover: string;
  textPrimary: string;
  textPrimaryHover: string;
  bgBodyHover: string;
  bgPrimary: string;
  bgPrimaryHover: string;
  bgPrimaryChecked: string;
  bgPrimaryBefore: string;
  bgPrimaryBefore30: string;
  bgPrimaryAfter: string;
  bgPrimaryAfter50: string;
  borderColorHover: string;
  borderColorGroupHover: string;
  borderPrimary: string;
  borderPrimaryHover: string;
  borderPrimaryFocus: string;
  borderPrimaryChecked: string;
  borderPrimaryBefore: string;
  borderPrimaryAfter: string;
  coloredLogoFullImage: BaseResponse["colored_logo_full_image"];
  coloredLogoMiniImage: BaseResponse["colored_logo_mini_image"];
  lightLogoFullImage: BaseResponse["light_logo_full_image"];
  lightLogoMiniImage: BaseResponse["light_logo_mini_image"];
  darkLogoFullImage: BaseResponse["dark_logo_full_image"];
  darkLogoMiniImage: BaseResponse["dark_logo_mini_image"];
  primaryPhone: BaseResponse["primary_phone"];
  secondaryPhone: BaseResponse["secondary_phone"];
  primaryEmail: BaseResponse["primary_email"];
  secondaryEmail: BaseResponse["secondary_email"];
  cityName: BaseResponse["city_name"];
  POBox: BaseResponse["PO_box"];
  street: BaseResponse["street_address"];
  socialMediaLinksVersion: BaseResponse["social_media_links_version"];
  facebook: BaseResponse["facebook_URL"];
  instagram: BaseResponse["instagram_URL"];
  twitterX: BaseResponse["X_URL"];
  linkedin: BaseResponse["linkedin_URL"];
  spotify: BaseResponse["spotify_URL"];
  asideExists: boolean;
  setAsideExists: (asideExists: boolean) => void;
  isNavModalOpen: boolean;
  setIsNavModalOpen: (isNavModalOpen: boolean) => void;
  navLinksMap: NavLinksMap;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (closeSideBarOnMobile: boolean) => void;
}
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



