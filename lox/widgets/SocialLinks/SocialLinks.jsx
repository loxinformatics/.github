"use client";

import style from "./SocialLinks.module.css";
import { useSocialLinksContext } from "./context";

const version = process.env.NEXT_PUBLIC_SOCIAL_LINKS_VERSION || "V1";

export default function SocialLinks() {
  const { socialLinks } = useSocialLinksContext();

  if (!socialLinks) return <></>;

  return (
    <div className="d-flex">
      {socialLinks.facebook && (
        <a
          href={socialLinks.facebook}
          target="_blank"
          className={`${style[`${version}_link`]} facebook`}
        >
          <i className="bi bi-facebook"></i>
        </a>
      )}

      {socialLinks.twitter_x && (
        <a
          href={socialLinks.twitter_x}
          target="_blank"
          className={`${style[`${version}_link`]} twitter_x`}
        >
          <i className="bi bi-twitter-x"></i>
        </a>
      )}

      {socialLinks.instagram && (
        <a
          href={socialLinks.instagram}
          target="_blank"
          className={`${style[`${version}_link`]} instagram`}
        >
          <i className="bi bi-instagram"></i>
        </a>
      )}

      {socialLinks.whatsapp && (
        <a
          href={socialLinks.whatsapp}
          target="_blank"
          className={`${style[`${version}_link`]} whatsapp`}
        >
          <i className="bi bi-whatsapp"></i>
        </a>
      )}

      {socialLinks.linkedin && (
        <a
          href={socialLinks.linkedin}
          target="_blank"
          className={`${style[`${version}_link`]} linkedin`}
        >
          <i className="bi bi-linkedin"></i>
        </a>
      )}
    </div>
  );
}
