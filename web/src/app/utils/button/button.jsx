"use client";

import Link from "next/link";
import styles from "./button.module.css";


export default function Button({ name, href }) {
	return (
		<Link href={href} className={`${styles.customBtn} scrollto`}>{name}</Link>
	)
}
