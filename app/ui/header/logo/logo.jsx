"use client";

import Image from "next/image";
import Link from "next/link";
import { useHeadercontext } from "@/app/ui/header/header";
import styles from "./logo.module.css";


export default function Logo() {
    const { logo, short_name } = useHeadercontext();

    return (
        <Link href="/#hero" className="link-white">
            {logo ? (
                <Image
                    src={logo}
                    width={55}
                    height={55}
                    alt="logo"
                    priority={true}
                />
            ) : (
                <h1 className={styles.text}>
                    {short_name}
                    <span className="text-primary">.</span>
                </h1>
            )}
        </Link>
    );
}
