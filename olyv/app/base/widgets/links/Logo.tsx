"use client";

import Image from "next/image";
import { useBase } from "../../../../context/base";
import { homeURL } from "../../../../utils/base";
import Anchor from "./Anchor";
import type { LogoProps } from "./types";

export default function Logo({ logoVersion, textColor }: LogoProps) {
  const { coloredLogoFullImage, fullName, shortName, textPrimary } = useBase();
  const version = logoVersion || "logo_image";
  const color = textColor || "text-color dark:text-color-reverse";

  return (
    <Anchor href={homeURL} id="logo" className="py-2">
      {version === "logo_image" ? (
        // TODO: Have an option for choosing whether to either differentiate which images should be showing based on screen size or theme is dark, or if just one image should be used irrespective of screen size or theme.
        <Image
          src={coloredLogoFullImage || "/app/logo.png"}
          width={65}
          height={65}
          alt="logo"
          priority
        />
      ) : (
        <span className={`${color} inline-block font-bold text-3xl py-4`}>
          {version === "app_full_name" && fullName}
          {version === "app_short_name" && shortName}
          <span className={textPrimary}>.</span>
        </span>
      )}
    </Anchor>
  );
}
