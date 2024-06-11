"use client";

import styles from "./Logo.module.css";
import Image from "next/image";
import Link from "next/link";
import { useBaseContext } from "@/app/base/context";

export function Logo() {
  const { base } = useBaseContext();
  const logo = base?.logo;
  const short_name = base?.short_name;

  return (
    <Link href="/#hero" className="link-white">
      {logo ? (
        <Image src={logo} width={55} height={55} alt="logo" priority={true} />
      ) : short_name ? (
        <h1 className={styles.logo_text}>
          {short_name}
          <span className="text-primary">.</span>
        </h1>
      ) : (
        <h1 className={styles.logo_text}>
          Logo
          <span className="text-primary">.</span>
        </h1>
      )}
    </Link>
  );
}
