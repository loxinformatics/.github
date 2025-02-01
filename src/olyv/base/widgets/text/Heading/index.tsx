"use client";

import { createElement } from "react";

export default function Heading({
  variant = "h1",
  children,
  className,
  dangerouslySetInnerHTML,
}: {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
} & (
  | { children: React.ReactNode; dangerouslySetInnerHTML?: never }
  | { children?: never; dangerouslySetInnerHTML: { __html: string } }
)) {
  const classes = `font-bold
  ${variant === "h1" && "text-3xl lg:text-5xl leading-9 lg:leading-10"}
  ${variant === "h2" && "text-lg lg:text-2xl"}

  ${variant === "h3" && "text-3xl"}
  ${variant === "h4" && "text-2xl"}

  ${
    variant === "h5" &&
    "text-xl text-color-secondary dark:text-color-secondary-reverse"
  }
  
  ${
    variant === "h6" &&
    "text-lg text-color-secondary dark:text-color-secondary-reverse"
  }
  
  ${className}`;

  return createElement(variant, {
    className: classes,
    ...(dangerouslySetInnerHTML && { dangerouslySetInnerHTML }),
    ...(!dangerouslySetInnerHTML && { children }),
  });
}
