"use client";

import Link from "next/link";
import { BsTwitterX, BsFacebook, BsLinkedin, BsWhatsapp, BsInstagram } from "react-icons/bs";
import styles from "./styles.module.css";

export default function SocialLinks({ root }) {
	
	return (
		<div className="social-links">
			{root.facebook && (
				<Link href={root.facebook} target="_blank" className={`${styles.socialLink} facebook`}>
					<BsFacebook />
				</Link>
			)}
			{root.twitter_x && (
				<Link href={root.twitter_x} target="_blank" className={`${styles.socialLink} twitter`}>
					<BsTwitterX />
				</Link>
			)}
			{root.instagram && (
				<Link href={root.instagram} target="_blank" className={`${styles.socialLink} instagram`}>
					<BsInstagram />
				</Link>
			)}
			{root.whatsapp && (
				<Link href={root.whatsapp} target="_blank" className={`${styles.socialLink} whatsapp`}>
					<BsWhatsapp />
				</Link>
			)}
			{root.linkedin && (
				<Link href={root.linkedin} target="_blank" className={`${styles.socialLink} linkedin`}>
					<BsLinkedin />
				</Link>
			)}
		</div>
	);
}
