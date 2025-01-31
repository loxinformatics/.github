// utils

export interface BaseData {
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

export interface MetaData {
  full_name?: string;
  motto_description?: string;
  website_URL?: string;
  favicon_image?: string;
  apple_image?: string;
  og_image?: string;
  X_image?: string;
}

export interface ManifestData {
  full_name?: string;
  short_name?: string;
  motto_description?: string;
  pwa_192_image?: string;
  pwa_512_image?: string;
  apple_image?: string;
}

export type ThemeColorKey = "#e84545";

export interface BaseContext {
  csrfToken: BaseData["csrf_token"];
  fullName: BaseData["full_name"];
  shortName: BaseData["short_name"];
  motto: BaseData["motto_description"];
  primaryColor: BaseData["primary_color"];
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
  coloredLogoFullImage: BaseData["colored_logo_full_image"];
  coloredLogoMiniImage: BaseData["colored_logo_mini_image"];
  lightLogoFullImage: BaseData["light_logo_full_image"];
  lightLogoMiniImage: BaseData["light_logo_mini_image"];
  darkLogoFullImage: BaseData["dark_logo_full_image"];
  darkLogoMiniImage: BaseData["dark_logo_mini_image"];
  primaryPhone: BaseData["primary_phone"];
  secondaryPhone: BaseData["secondary_phone"];
  primaryEmail: BaseData["primary_email"];
  secondaryEmail: BaseData["secondary_email"];
  cityName: BaseData["city_name"];
  POBox: BaseData["PO_box"];
  street: BaseData["street_address"];
  socialMediaLinksVersion: BaseData["social_media_links_version"];
  facebook: BaseData["facebook_URL"];
  instagram: BaseData["instagram_URL"];
  twitterX: BaseData["X_URL"];
  linkedin: BaseData["linkedin_URL"];
  spotify: BaseData["spotify_URL"];
  asideExists: boolean;
  setAsideExists: (asideExists: boolean) => void;
  isNavModalOpen: boolean;
  setIsNavModalOpen: (isNavModalOpen: boolean) => void;
  navLinksMap: NavLinksMap;
  isAsideOpen: boolean;
  setIsAsideOpen: (isAsideOpen: boolean) => void;
}
