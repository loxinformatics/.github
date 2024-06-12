"use client";

import styles from "./SocialLinks.module.css";
import Link from "next/link";
import { useBaseContext } from "../../../app/base/context";
import {
  BsTwitterX,
  BsFacebook,
  BsLinkedin,
  BsWhatsapp,
  BsInstagram,
} from "react-icons/bs";

export default function SocialLinks() {
  const { base } = useBaseContext();
  const facebook = base?.facebook;
  const twitter_x = base?.twitter_x;
  const instagram = base?.instagram;
  const whatsapp = base?.whatsapp;
  const linkedin = base?.linkedin;

  return (
    <>
      {facebook && (
        <Link
          href={facebook}
          target="_blank"
          className={`${styles.socialLink} facebook`}
        >
          <BsFacebook />
        </Link>
      )}
      {twitter_x && (
        <Link
          href={twitter_x}
          target="_blank"
          className={`${styles.socialLink} twitter`}
        >
          <BsTwitterX />
        </Link>
      )}
      {instagram && (
        <Link
          href={instagram}
          target="_blank"
          className={`${styles.socialLink} instagram`}
        >
          <BsInstagram />
        </Link>
      )}
      {whatsapp && (
        <Link
          href={whatsapp}
          target="_blank"
          className={`${styles.socialLink} whatsapp`}
        >
          <BsWhatsapp />
        </Link>
      )}
      {linkedin && (
        <Link
          href={linkedin}
          target="_blank"
          className={`${styles.socialLink} linkedin`}
        >
          <BsLinkedin />
        </Link>
      )}
    </>
  );
}
