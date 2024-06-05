"use client";

import Link from "next/link";
import {
	BsTwitterX,
	BsFacebook,
	BsLinkedin,
	BsWhatsapp,
	BsInstagram
} from "react-icons/bs";
import styles from "./sociallinks.module.css";

import { useFootercontext } from "@/app/ui/footer/footer";

export default function SocialLinks() {
	const { facebook, twitter_x, instagram, whatsapp, linkedin } = useFootercontext()
	
	return (
		<>
			{facebook && (
				<Link href={facebook} target="_blank" className={`${styles.socialLink} facebook`}>
					<BsFacebook />
				</Link>
			)}
			{twitter_x && (
				<Link href={twitter_x} target="_blank" className={`${styles.socialLink} twitter`}>
					<BsTwitterX />
				</Link>
			)}
			{instagram && (
				<Link href={instagram} target="_blank" className={`${styles.socialLink} instagram`}>
					<BsInstagram />
				</Link>
			)}
			{whatsapp && (
				<Link href={whatsapp} target="_blank" className={`${styles.socialLink} whatsapp`}>
					<BsWhatsapp />
				</Link>
			)}
			{linkedin && (
				<Link href={linkedin} target="_blank" className={`${styles.socialLink} linkedin`}>
					<BsLinkedin />
				</Link>
			)}
		</>
	);
}
