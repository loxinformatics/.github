"use client";

import { createElement } from "react";
import type { HeadingProps } from "../../types/base";

export default function Heading({
  variant = "h1",
  children,
  className,
  dangerouslySetInnerHTML,
}: HeadingProps) {
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
