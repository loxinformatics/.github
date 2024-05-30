"use client";

import Link from "next/link";
import "./CallToAction.css"

export default function CallToAction() {
	return (
		<section id="cta" className="cta">
			<div className="container" data-aos="zoom-in">

				<div className="text-center">
					<h3>Call To Action</h3>
					<p> Contact us now for a free consultation</p>
					<Link className="cta-btn" href="#">Call To Action</Link>
				</div>

			</div>
		</section>
	);
}