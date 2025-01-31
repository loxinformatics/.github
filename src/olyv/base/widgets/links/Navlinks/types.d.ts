export interface NavigationItem {
  text: string;
  icon?: string;
  href: string;
  type?: string;
  authorized?: string[];
  children?: NavigationItem[];
}
