"use client";

import styles from "./SectionTitle.module.css";

export default function SectionTitle({ heading, paragraph, dataAOS = "fade-in" }) {
  return (
    <div className={styles.title} data-aos={dataAOS}>
      <h2 className={styles.h2}>{heading}</h2>
      <p className={styles.p}>{paragraph}</p>
    </div>
  );
}
