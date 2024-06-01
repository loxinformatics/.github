"use client";

import Link from "next/link";
import styles from "./styles.module.css";


export default function ForwardBtn({ name, href }) {
	return (
		<Link href={href} className={`${styles.forwardBtn}  scrollto`}>{name}</Link>
	)
}
