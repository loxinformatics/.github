// utils

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
  isAsideOpen: boolean;
  setIsAsideOpen: (isAsideOpen: boolean) => void;
}
