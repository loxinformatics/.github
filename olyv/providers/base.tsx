"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { ThemeProvider } from "next-themes";
import { Titillium_Web } from "next/font/google";
import { createContext, forwardRef, useContext, useEffect } from "react";
import baseStyles from "../styles/base.module.css";
import type {
  BaseContext,
  BaseProps,
  SectionProps,
  SectionTitleProps,
  ThemeColorKey,
} from "../types/base";
import { ScrollTop } from "../widgets/base";

export const baseContext = createContext<BaseContext | undefined>(undefined);

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: "300",
});

export function Base({
  csrf_token,
  full_name,
  short_name,
  motto: the_motto,
  theme_color: primary_color,
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
  street: the_street,
  open_days,
  open_hours,
  map: mapURL,
  social_media_links_version,
  facebook: facebook_url,
  instagram: instagram_url,
  twitter_x,
  linkedin: linkedin_url,
  spotify: spotify_url,
  children,
}: BaseProps) {
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
  const motto = the_motto || "";
  const primaryPhone = primary_phone || "";
  const secondaryPhone = secondary_phone || "";
  const primaryEmail = primary_email || "";
  const secondaryEmail = secondary_email || "";
  const cityName = city_name || "";
  const POBox = PO_box || "";
  const street = the_street || "";
  const openDays = open_days || "";
  const openHours = open_hours || "";
  const map = mapURL || "";
  const primaryColor = primary_color || "#e84545";
  const coloredLogoFullImage = colored_logo_full_image;
  const coloredLogoMiniImage = colored_logo_mini_image || "";
  const lightLogoFullImage = light_logo_full_image || "";
  const lightLogoMiniImage = light_logo_mini_image || "";
  const darkLogoFullImage = dark_logo_full_image || "";
  const darkLogoMiniImage = dark_logo_mini_image || "";
  const socialMediaLinksVersion = social_media_links_version || "V1";
  const facebook = facebook_url || "";
  const instagram = instagram_url || "";
  const twitterX = twitter_x || "";
  const linkedin = linkedin_url || "";
  const spotify = spotify_url || "";

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
    // * Ensure that all of these are being not used only within base.
    // * Each one of these values should be global

    // misc
    csrfToken,
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
    openDays,
    openHours,
    map,
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
              bg-body dark:bg-body-reverse
              text-color dark:text-color-reverse
              ${titillium.className} antialiased
            `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <baseContext.Provider value={context}>
            {children}
            <ScrollTop />
          </baseContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function useBase() {
  const context = useContext(baseContext);
  if (!context) {
    throw new Error("useBase must be used within a BaseProvider");
  }
  return context;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  function Section(
    {
      id,
      className,
      style,
      dataAos,
      container = true,
      center = true,
      padding = true,
      fullscreen = false,
      children,
      title_version,
      title_h2,
      title_h3,
      title_p,
    },
    ref
  ) {
    const Title = ({
      titleH2,
      titleH3,
      titleP,
      titleVersion,
    }: SectionTitleProps) => {
      const { textPrimary, bgPrimaryBefore, bgPrimaryAfter } = useBase();
      const version = titleVersion || "V1";

      return (
        <div
          className={`${baseStyles.title} ${
            version !== "V1" ? "text-center" : "text-start"
          }`}
        >
          <div>
            {titleH2 && (
              <h2
                className={`${baseStyles[`${version}_h2`]} 
            ${
              version === "V1" &&
              "text-color-secondary dark:text-color-secondary-reverse"
            }
            ${
              version === "V3" &&
              `${textPrimary} bg-body-secondary dark:bg-body-secondary-reverse`
            }
             ${bgPrimaryBefore} ${bgPrimaryAfter}`}
              >
                {titleH2}
              </h2>
            )}

            {titleH3 && version === "V3" && (
              <h3 className={baseStyles[`${version}_h3`]}>{titleH3}</h3>
            )}

            {titleP && <p className={baseStyles[`${version}_p`]}>{titleP}</p>}
          </div>
        </div>
      );
    };

    // Check if any title-related props are provided
    const hasTitle = title_h2 || title_h3 || title_p;

    // TODO: Remove ClassName, and put custom props
    return (
      <section
        ref={ref}
        id={id}
        className={`relative overflow-hidden ${className}
          ${fullscreen && "h-screen w-full flex flex-col"}
        `}
        style={style}
        {...(dataAos && { "data-aos": dataAos })}
      >
        {hasTitle && (
          <div
            className={`
                 ${container && "container"}
                 ${center && `mx-auto`}
                 ${padding ? "py-10" : "pb-10"}
                 ${fullscreen && "flex-initial"}
                `}
          >
            <Title
              titleVersion={title_version}
              titleH2={title_h2}
              titleH3={title_h3}
              titleP={title_p}
            />
          </div>
        )}

        <div
          className={`
            ${container && `container`}
            ${center && `mx-auto`}
            ${padding && (!hasTitle ? "py-10" : "pb-10")}
            ${fullscreen && "flex-1 flex"} 
          `}
          // TODO: For fullscreen add the option of making it 'flex flex-row', 'flex flex-col' 'or 'grid and the number of grid rows.'
        >
          {children}
        </div>
      </section>
    );
  }
);
