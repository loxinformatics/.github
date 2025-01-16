// actions & utils
export type ToggleAsideAction = "toggle" | "closeOnMobile";

export type NavLinkType = "dropdown" | "heading" | "login" | "logout" | "login/logout" | "page" | "";

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

// components
export interface NavLinksProps {
  links?: NavLink[];
  layout: "header" | "aside" | "modal";
  renderLink: (link: NavLink, index: number, sharedProps: any) => ReactNode;
  className?: any;
  id?: string;
}

// providers
export interface CoreProps {
  children: React.ReactNode;
}

export interface CoreContextValues {
  asideExists: boolean;
  setAsideExists: (asideExists: boolean) => void;
  toggleAside: (action?: ToggleAsideAction) => void;
  AsideToggle: () => JSX.Element | null;
  createNavLinks: (config: NavLink[]) => NavLink[];
  navLinksMap: NavLinksMap;
  scroll_to: (el: string) => void;
  Nav: (props: NavLinksProps) => JSX.Element;
  coreApiURL: string;
}
