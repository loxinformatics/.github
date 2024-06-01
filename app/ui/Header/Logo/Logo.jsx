"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";


export default function Logo() {
	return (
		<Link href="/" className="link-white me-auto me-lg-0">

			{/* <h1 className={styles.text}>Lox<span className="text-primary">.</span></h1> */}

			{/* Uncomment below if you prefer to use an image logo */}

			<Image
				src="/images/logo.jpg"
				width={45}
				height={40}
				alt="logo"
				className={`${styles.img} img-fluid`}
				priority={true}
			/>

		</Link>
	)
}
