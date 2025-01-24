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

export interface NavLinksProps {
  links?: NavLink[];
  layout: "header" | "aside" | "modal";
  renderLink: (link: NavLink, index: number, sharedProps: any) => ReactNode;
  className?: any;
  id?: string;
}

export interface SocialMediaLinkProps {
  href: string;
  version: string | undefined;
  className: string;
  iconClass: string;
}
