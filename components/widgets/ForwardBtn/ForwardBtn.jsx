"use client";

import Link from "next/link";
import "./ForwardBtn.css";


export default function ForwardBtn({ name, href }) {
	return (
		<Link href={href} className="forward-btn scrollto">{name}</Link>
	)
}
