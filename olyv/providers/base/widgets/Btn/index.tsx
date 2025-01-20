"use client";

import Link from "next/link";
import { useBase } from "../..";
import type { ButtonProps } from "../../types";

const Btn = ({
  id,
  className,
  disabled = false,
  type = "button",
  outline = false,
  size = "md",
  href,
  onClick,
  children,
}: ButtonProps) => {
  const {
    bgPrimary,
    borderPrimary,
    bgBodyHover,
    bgPrimaryHover,
    handleHashLinkClick,
  } = useBase();

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
    text-white whitespace-nowrap rounded font-medium
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
        <Link
          id={id}
          className={commonClasses}
          href={href || "#"}
          onClick={(e) => handleHashLinkClick(e, href)}
          {...((href.startsWith("http") || href.startsWith("https")) && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {children}
        </Link>
      );
  }
};

export default Btn;
