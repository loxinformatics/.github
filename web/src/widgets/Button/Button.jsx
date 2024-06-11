"use client";

import styles from "./Button.module.css";
import Link from "next/link";

export function Button({ name, href }) {
  return (
    <Link href={href} className={`${styles.customBtn} scrollto`}>
      {name}
    </Link>
  );
}
