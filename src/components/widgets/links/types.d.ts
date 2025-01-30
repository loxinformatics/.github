export interface AnchorProps {
  href?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface LogoProps {
  logoVersion?: "logo_image" | "app_full_name" | "app_short_name";
  textColor?: string;
}

export interface NavigationItem {
  text: string;
  icon?: string;
  href: string;
  type?: string;
  authorized?: string[];
  children?: NavigationItem[];
}

export interface SocialMediaLinkProps {
  href: string;
  version: string | undefined;
  className: string;
  iconClass: string;
}
