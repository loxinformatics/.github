"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { ThemeProvider } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";
import ScrollTop from "../../widgets/buttons/ScrollTop";
import navLinksMap from "../../widgets/nav/navigation";
import type { BaseContext, BaseData, ThemeColorKey } from "./types";

const baseContext = createContext<BaseContext | undefined>(undefined);

export default function Base({
  csrf_token,
  full_name,
  short_name,
  motto_description,
  primary_color,
  colored_logo_full_image,
  colored_logo_mini_image,
  light_logo_full_image,
  light_logo_mini_image,
  dark_logo_full_image,
  dark_logo_mini_image,
  primary_phone,
  secondary_phone,
  primary_email,
  secondary_email,
  city_name,
  PO_box,
  street_address,
  social_media_links_version,
  facebook_URL,
  instagram_URL,
  X_URL,
  linkedin_URL,
  spotify_URL,
  children,
}: BaseData & { children: React.ReactNode }) {
  const [asideExists, setAsideExists] = useState<boolean>(false);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);

  const themeColorMap = {
    "#e84545": {
      // textColor: use the one already defined by 'color' variable in Tailwind
      textColorHover: "hover:text-primary dark:hover:text-primary-reverse",
      textColorGroupHover:
        "group-hover:text-primary dark:group-hover:text-primary-reverse",
      textPrimary: "text-primary dark:text-primary-reverse",
      textPrimaryHover: "hover:text-primary-reverse dark:hover:text-primary",
      // bgBody: use the one already defined by 'body' variable in Tailwind
      bgBodyHover: "hover:bg-primary dark:hover:bg-primary-reverse",
      bgPrimary: "bg-primary dark:bg-primary-reverse",
      bgPrimaryHover: "hover:bg-primary-reverse dark:hover:bg-primary",
      bgPrimaryChecked:
        "checked:bg-primary/90 dark:checked:bg-primary-reverse/90",
      bgPrimaryBefore: "before:bg-primary dark:before:bg-primary-reverse",
      bgPrimaryBefore30:
        "before:bg-primary/30 dark:before:bg-primary-reverse/30",
      bgPrimaryAfter: "after:bg-primary dark:after:bg-primary-reverse",
      bgPrimaryAfter50: "after:bg-primary/50 dark:after:bg-primary-reverse/50",
      // borderColor ( note that 'border' by itself automatically applies a color.): use the one already defined by 'color' variable in Tailwind
      borderColorHover:
        "hover:border-primary dark:hover:border-primary-reverse",
      borderColorGroupHover:
        "group-hover:border-primary dark:group-hover:border-primary-reverse",
      borderPrimary: "border-primary dark:border-primary-reverse",
      borderPrimaryHover:
        "hover:border-primary-reverse dark:hover:border-primary",
      borderPrimaryFocus:
        "focus:border-primary dark:focus:border-primary-reverse",
      borderPrimaryChecked:
        "checked:border-primary dark:checked:border-primary-reverse",
      borderPrimaryBefore:
        "before:border-primary dark:before:border-primary-reverse",
      borderPrimaryAfter:
        "after:border-primary dark:after:border-primary-reverse",
    },
  } as const;

  const {
    textColorHover,
    textColorGroupHover,
    textPrimary,
    textPrimaryHover,
    bgBodyHover,
    bgPrimary,
    bgPrimaryHover,
    bgPrimaryChecked,
    bgPrimaryBefore,
    bgPrimaryBefore30,
    bgPrimaryAfter,
    bgPrimaryAfter50,
    borderColorHover,
    borderColorGroupHover,
    borderPrimary,
    borderPrimaryHover,
    borderPrimaryFocus,
    borderPrimaryChecked,
    borderPrimaryBefore,
    borderPrimaryAfter,
  } = themeColorMap[primary_color as ThemeColorKey] ?? themeColorMap["#e84545"];

  const csrfToken = csrf_token || "";
  const fullName = full_name || "";
  const shortName = short_name || "";
  const motto = motto_description || "";
  const primaryPhone = primary_phone || "";
  const secondaryPhone = secondary_phone || "";
  const primaryEmail = primary_email || "";
  const secondaryEmail = secondary_email || "";
  const cityName = city_name || "";
  const POBox = PO_box || "";
  const street = street_address || "";
  const primaryColor = primary_color || "#e84545";
  const coloredLogoFullImage = colored_logo_full_image;
  const coloredLogoMiniImage = colored_logo_mini_image || "";
  const lightLogoFullImage = light_logo_full_image || "";
  const lightLogoMiniImage = light_logo_mini_image || "";
  const darkLogoFullImage = dark_logo_full_image || "";
  const darkLogoMiniImage = dark_logo_mini_image || "";
  const socialMediaLinksVersion = social_media_links_version || "V1";
  const facebook = facebook_URL || "";
  const instagram = instagram_URL || "";
  const twitterX = X_URL || "";
  const linkedin = linkedin_URL || "";
  const spotify = spotify_URL || "";

  // Initialization
  useEffect(() => {
    // AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      delay: 200,
    });
  }, []);

  // Context
  const context: BaseContext = {
    // misc
    csrfToken,
    asideExists,
    setAsideExists,
    isNavModalOpen,
    setIsNavModalOpen,
    navLinksMap,
    isAsideOpen,
    setIsAsideOpen,
    // metadata
    fullName,
    shortName,
    motto,
    primaryColor,
    textPrimary,
    textPrimaryHover,
    textColorHover,
    textColorGroupHover,
    bgPrimary,
    bgPrimaryHover,
    bgBodyHover,
    bgPrimaryChecked,
    bgPrimaryBefore,
    bgPrimaryBefore30,
    bgPrimaryAfter,
    bgPrimaryAfter50,
    borderPrimary,
    borderPrimaryHover,
    borderColorHover,
    borderColorGroupHover,
    borderPrimaryFocus,
    borderPrimaryChecked,
    borderPrimaryBefore,
    borderPrimaryAfter,
    // contact info
    primaryPhone,
    secondaryPhone,
    primaryEmail,
    secondaryEmail,
    cityName,
    POBox,
    street,
    // social media links
    socialMediaLinksVersion,
    facebook,
    instagram,
    twitterX,
    linkedin,
    spotify,
    // logos
    coloredLogoFullImage,
    coloredLogoMiniImage,
    lightLogoFullImage,
    lightLogoMiniImage,
    darkLogoFullImage,
    darkLogoMiniImage,
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <baseContext.Provider value={context}>
        {children}
        <ScrollTop />
      </baseContext.Provider>
    </ThemeProvider>
  );
}

export function useBase() {
  const context = useContext(baseContext);
  if (!context) {
    throw new Error("useBase must be used within a BaseProvider");
  }
  return context;
}
