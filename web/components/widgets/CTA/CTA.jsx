"use client";

import styles from "./CTA.module.css";
import Link from "next/link";

export default function CTA({ heading, paragraph, href, button }) {
  return (
    <section id="cta" className={styles.cta}>
      <div className="container" data-aos="zoom-in">
        <div className="text-center">
          <h3 className={styles.h3}>{heading}</h3>
          <p className={styles.p}>{paragraph}</p>
          <Link className={styles.btn} href={href} target="_blank">
            {button}
          </Link>
        </div>
      </div>
    </section>
  );
}
