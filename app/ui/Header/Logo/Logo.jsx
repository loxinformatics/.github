"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";


export default function Logo({ root }) {
    return (
        <Link href="/" className="link-white me-auto me-lg-0">
            {root.logo ? (
                <Image
                    src={root.logo}
                    width={55}
                    height={55}
                    alt="logo"
                />
            ) : (
                <h1 className={styles.text}>
                    {root.short_name}
                    <span className="text-primary">.</span>
                </h1>
            )}
        </Link>
    );
}
