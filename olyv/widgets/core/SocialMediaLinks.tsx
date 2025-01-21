"use client";

import { useBase } from "../../context/base";
import baseStyles from "../../styles/base.module.css";
import type { SocialMediaLinkProps } from "../../types/base";

export default function SocialMediaLinks() {
  const {
    socialMediaLinksVersion,
    facebook,
    twitterX,
    instagram,
    linkedin,
    spotify,
    bgBodyHover,
    borderColorHover,
    textColorHover,
    bgPrimary,
    bgPrimaryHover,
  } = useBase();
  const socialLinks = [
    {
      href: facebook || "",
      className: "facebook",
      iconClass: "bi-facebook",
    },
    {
      href: twitterX || "",
      className: "twitter_x",
      iconClass: "bi-twitter-x",
    },
    {
      href: instagram || "",
      className: "instagram",
      iconClass: "bi-instagram",
    },
    {
      href: linkedin || "",
      className: "linkedin",
      iconClass: "bi-linkedin",
    },
    {
      href: spotify || "",
      className: "spotify",
      iconClass: "bi-spotify",
    },
  ];

  const SocialMediaLink = ({
    href,
    version,
    className,
    iconClass,
  }: SocialMediaLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles[`${version}_socialMediaLink`]} ${className}

        ${version === "V1" && bgBodyHover}
        
        ${
          version === "V2" &&
          `border border-color/50 dark:border-color-reverse/50 ${borderColorHover}
          text-color/50 dark:text-color-reverse/50 ${textColorHover}`
        }

        ${version === "V3" && `text-white ${bgPrimary} ${bgPrimaryHover}`}
      `}
      >
        <i className={`bi ${iconClass}`}></i>
      </a>
    );
  };

  return (
    <div className="flex">
      {socialLinks.map(
        (link, index) =>
          link.href && (
            <SocialMediaLink
              key={index}
              href={link.href}
              version={socialMediaLinksVersion}
              className={link.className}
              iconClass={link.iconClass}
            />
          )
      )}
    </div>
  );
}
