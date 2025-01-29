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

export interface ThemeTogglerProps {
  toggleColor?: string;
}
