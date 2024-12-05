"use client";

import Image from "next/image";
import Link from "next/link";
import style from "./Logo.module.css";

const version = process.env.NEXT_PUBLIC_LOGO_VERSION || "V1";

export default function Logo() {
  return (
    <Link id="logo" href="/">
      {version === "V1" ? (
        <Image
          src="/img/logo.png"
          width={55}
          height={55}
          alt="school logo"
          priority={true}
        />
      ) : (
        <h1
          className={`${style.text} fw-bold text-uppercase text-body m-0 p-0`}
        >
          {version === "V2" && process.env.NEXT_PUBLIC_FULL_NAME}
          {version === "V3" && process.env.NEXT_PUBLIC_SHORT_NAME}
          <span className="link-primary">.</span>
        </h1>
      )}
    </Link>
  );
}
