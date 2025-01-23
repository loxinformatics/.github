// api
export interface DataRequestOptions {
  endpoint: string;
  extra_action?: string;
  revalidate?: number;
}

// TODO: differentiate for each of them
export type BaseRequestActions = "base" | "metadata" | "manifest";

export interface BaseResponse {
  csrf_token?: string;
  full_name?: string;
  short_name?: string;
  motto?: string;
  theme_color?: string;
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
  street?: string;
  open_days?: string;
  open_hours?: string;
  map?: string;
  social_media_links_version?: "V1" | "V2" | "V3";
  facebook?: string;
  instagram?: string;
  twitter_x?: string;
  linkedin?: string;
  spotify?: string;
}

export interface MetadataResponse {
  full_name?: string;
  motto?: string;
  website?: string;
  favicon?: string;
  apple_touch_icon?: string;
  og_image?: string;
  twitter_image?: string;
}

export interface ManifestResponse {
  full_name?: string;
  short_name?: string;
  motto?: string;
  background_color?: string;
  theme_color?: string;
  pwa_192?: string;
  pwa_512?: string;
  apple_touch_icon?: string;
}

export interface SectionResponse {
  title_h2?: string;
  title_h3?: string;
  title_p?: string;
  title_version?: "V1" | "V2" | "V3";
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

// providers
export interface BaseProps extends BaseResponse {
  children: React.ReactNode;
}

export type ThemeColorKey = "#e84545";

export interface BaseContext {
  csrfToken: BaseResponse["csrf_token"];
  fullName: BaseResponse["full_name"];
  shortName: BaseResponse["short_name"];
  motto: BaseResponse["motto"];
  primaryColor: BaseResponse["theme_color"];
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
  street: BaseResponse["street"];
  openDays: BaseResponse["open_days"];
  openHours: BaseResponse["open_hours"];
  map: BaseResponse["map"];
  socialMediaLinksVersion: BaseResponse["social_media_links_version"];
  facebook: BaseResponse["facebook"];
  instagram: BaseResponse["instagram"];
  twitterX: BaseResponse["twitter_x"];
  linkedin: BaseResponse["linkedin"];
  spotify: BaseResponse["spotify"];
}

export interface SectionTitleProps {
  titleH2?: SectionResponse["title_h2"];
  titleH3?: SectionResponse["title_h3"];
  titleP?: SectionResponse["title_p"];
  titleVersion?: SectionResponse["title_version"];
}

export interface SectionProps extends SectionResponse {
  container?: boolean;
  padding?: boolean;
  fullscreen?: boolean;
  children?: React.ReactNode;
  ref?: MutableRefObject<HTMLDivElement | null>;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

// widgets
export interface AnchorProps {
  href?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  outline?: boolean | "primary";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: any; // TODO: change this to match the function type
  children?: React.ReactNode;
}

export type HeadingProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
} & (
  | { children: React.ReactNode; dangerouslySetInnerHTML?: never }
  | { children?: never; dangerouslySetInnerHTML: { __html: string } }
);

export interface SpinnerProps {
  borderSize?: "small" | "medium" | "large";
  borderColor?: string;
}

export interface AlertProps {
  children: React.ReactNode;
  status: "success" | "error" | "warning" | "info";
}

export interface ModalProps {
  id?: string;
  toggleButtonColor?: string;
  isModalOpen: boolean;
  toggleModal: any; //TODO: change this to match the function type
  children: React.ReactNode;
}

export interface FormStatusProps {
  success?: string | null;
  error?: string | null;
  loading?: boolean;
}

export interface FormProps {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  success?: string | null;
  error?: string | null;
  loading?: boolean;
}

export interface ThemeTogglerProps {
  toggleColor?: string;
}

export interface LogoProps {
  logoVersion?: "logo_image" | "app_full_name" | "app_short_name";
  textColor?: string;
}

