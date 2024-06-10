"use client";

import styles from "./title.module.css";


export default function Title({ heading, paragraph }) {
    return (
        <div className={styles.title}>
            <h2 className={styles.h2}>{heading}</h2>
            <p className={styles.p}>{paragraph}</p>
        </div>
    );
}
