"use client";

import Link from "next/link";
import { BsTwitterX, BsFacebook, BsLinkedin, BsWhatsapp, BsInstagram } from "react-icons/bs";
import "./SocialLinks.css";

export default function SocialLinks({ data }) {
	return (
		<div className="social-links">
			{data.facebook && (
				<Link href={data.facebook} className="facebook"><BsFacebook /></Link>
			)}
			{data.twitter_x && (
				<Link href={data.twitter_x} className="twitter"><BsTwitterX /></Link>
			)}
			{data.instagram && (
				<Link href={data.instagram} className="instagram"><BsInstagram /></Link>
			)}
			{data.whatsapp && (
				<Link href={data.whatsapp} className="whatsapp"><BsWhatsapp /></Link>
			)}
			{data.linkedin && (
				<Link href={data.linkedin} className="linkedin"><BsLinkedin /></Link>
			)}
		</div>
	);
}