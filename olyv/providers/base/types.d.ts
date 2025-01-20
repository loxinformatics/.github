// actions & config
export interface BaseData {
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

export interface BaseMetadata {
  full_name?: string;
  motto?: string;
  website?: string;
  favicon?: string;
  apple_touch_icon?: string;
  og_image?: string;
  twitter_image?: string;
}

export interface BaseManifest {
  full_name?: string;
  short_name?: string;
  motto?: string;
  background_color?: string;
  theme_color?: string;
  pwa_192?: string;
  pwa_512?: string;
  apple_touch_icon?: string;
}

export interface SectionData {
  title_h2?: string;
  title_h3?: string;
  title_p?: string;
  title_version?: "V1" | "V2" | "V3";
}

export interface FetchDataOptions {
  endpoint: string;
  extra_action?: string;
  revalidate?: number;
}

export type FetchBaseDetailPropOptions = "base" | "metadata" | "manifest";

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

export interface MailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  endpoint: string;
}

// components
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

export interface SocialMediaLinkProps {
  href: string;
  version: string | undefined;
  className: string;
  iconClass: string;
}

export interface SectionProps extends SectionData {
  container?: boolean;
  center?: boolean;
  padding?: boolean;
  fullscreen?: boolean;
  children?: React.ReactNode;
  ref?: MutableRefObject<HTMLDivElement | null>;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  dataAos?: "fade-up";
  dataAosDelay?: string;
}

export interface TitleProps {
  titleH2?: SectionData["title_h2"];
  titleH3?: SectionData["title_h3"];
  titleP?: SectionData["title_p"];
  titleVersion?: SectionData["title_version"];
}

// providers
export interface BaseProps extends BaseData {
  children: React.ReactNode;
}

export type ThemeColorKey = "#e84545";

export interface BaseContextValues {
  csrfToken: string;
  fullName: string;
  shortName: string;
  motto: string;
  primaryColor: string;
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
  coloredLogoFullImage: string;
  coloredLogoMiniImage: string;
  lightLogoFullImage: string;
  lightLogoMiniImage: string;
  darkLogoFullImage: string;
  darkLogoMiniImage: string;
  primaryPhone: string;
  secondaryPhone: string;
  primaryEmail: string;
  secondaryEmail: string;
  cityName: string;
  POBox: string;
  street: string;
  openDays: string;
  openHours: string;
  map: string;
  socialMediaLinksVersion: "V1" | "V2" | "V3";
  facebook: string;
  instagram: string;
  twitterX: string;
  linkedin: string;
  spotify: string;
  Btn: (props: ButtonProps) => JSX.Element;
  Spinner: (props: SpinnerProps) => JSX.Element;
  Alert: (props: AlertProps) => JSX.Element;
  Modal: (props: ModalProps) => JSX.Element;
  FormStatus: (props: FormStatusProps) => JSX.Element;
  Form: (props: FormProps) => JSX.Element;
  ThemeToggler: (props: ThemeTogglerProps) => JSX.Element;
  Logo: (props: LogoProps) => JSX.Element;
  SocialMediaLinks: () => JSX.Element;
  Section: (props: SectionProps) => JSX.Element;
  MailUsForm: () => JSX.Element;
  baseApiURL: string;
  homeURL: string;
  mail: (props: MailProps) => Promise<FormResponse>;
  handleHashLinkClick: any;
}
