"use client";

import Image from "next/image";
import Link from "next/link";
import { useBase } from "../../providers/base";
import type { LogoProps } from "../../types/base";
import { homeURL } from "../../utils/base";

export default function Logo({ logoVersion, textColor }: LogoProps) {
  const { coloredLogoFullImage, fullName, shortName, textPrimary } = useBase();
  const version = logoVersion || "logo_image";
  const color = textColor || "text-color dark:text-color-reverse";

  return (
    <Link id="logo" href={homeURL} className="py-2">
      {version === "logo_image" ? (
        // TODO: Have an option for choosing whether to either differentiate which images should be showing based on screen size or theme is dark, or if just one image should be used irrespective of screen size or theme.
        <Image
          src={coloredLogoFullImage || "/app/img/logo.png"}
          width={55}
          height={55}
          alt="logo"
          priority
        />
      ) : (
        <h1 className={`${color} font-bold text-3xl py-2`}>
          {version === "app_full_name" && fullName}
          {version === "app_short_name" && shortName}
          <span className={textPrimary}>.</span>
        </h1>
      )}
    </Link>
  );
}
