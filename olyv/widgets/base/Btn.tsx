"use client";

import { useBase } from "../../context/base";
import type { ButtonProps } from "../../types/base";
import Anchor from "./Anchor";

export default function Btn({
  id,
  className,
  disabled = false,
  type = "button",
  outline = false,
  size = "md",
  href,
  onClick,
  children,
}: ButtonProps) {
  const { bgPrimary, borderPrimary, bgBodyHover, bgPrimaryHover } = useBase();

  const sizeClasses = {
    sm: "px-4 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-[40px] py-[12px] text-base",
  };

  const commonClasses = `
    ${sizeClasses[size]} 
    ${!!outline ? "border-2" : bgPrimary}
    ${outline === true && "border-white"}
    ${outline === "primary" && borderPrimary}
    ${!!outline ? `${bgBodyHover} hover:border-transparent` : bgPrimaryHover}
    disabled:bg-gray-400 disabled:cursor-not-allowed
    text-white whitespace-nowrap rounded
    flex items-center justify-center  
    transition duration-300
    tracking-wider 
    ${className}
  `;

  const component = !!href ? "link" : "button";

  switch (component) {
    case "button":
    default:
      return (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          id={id}
          className={commonClasses}
        >
          {children}
        </button>
      );

    case "link":
      if (!href) return;

      return (
        <Anchor href={href || "#"} id={id} className={commonClasses}>
          {children}
        </Anchor>
      );
  }
}
