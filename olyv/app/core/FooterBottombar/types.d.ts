import type { NavLink } from "../../../providers/core/types";

// components
export interface FooterNavProps {
  links?: NavLink[];
}

export interface BottombarProps {
  themeToggler?: boolean;
}

export interface FooterBottombarProps extends BottombarProps {
  component?: "footerbottombar" | "footer" | "bottombar";
}
