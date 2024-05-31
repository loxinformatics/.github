"use client";

import Link from "next/link";
import { useBaseContext } from "@/app/context";
import { BiChevronRight } from "react-icons/bi";
import SocialLinks from "@/components/widgets/SocialLinks/SocialLinks";
import "./Footer.css";

function FooterInfo() {
	const { data, isLoading } = useBaseContext();

	if (isLoading) return data;  // data here is the loading/error/no data component

	return (
		<div className="footer-info">

			{data.name && (<h3>{data.name}<span>.</span></h3>)}

			<div className="mb-3">

				{data.primary_phone && data.secondary_phone && (
					<>
						<strong>Call:</strong><br />
						<div>{data.primary_phone}</div>
						<div>{data.secondary_phone}</div><br />
					</>
				)}

				{data.primary_email && data.secondary_email && (
					<>
						<strong>Email:</strong><br />
						<div>{data.primary_email}</div>
						<div>{data.secondary_email}</div>
					</>
				)}

			</div>
			<SocialLinks data={data} />
		</div>
	)
}

export default function Footer() {
	return (
		<footer id="footer">
			<div className="footer-top">
				<div className="container">
					<div className="row">

						<div className="col-lg-3 col-md-6">
							<FooterInfo />
						</div>

						<div className="col-lg-2 col-md-6 footer-links">
							<h4>Useful Links</h4>
							<ul>
								<li><BiChevronRight /> <Link href="#">Home</Link></li>
								<li><BiChevronRight /> <Link href="#">About us</Link></li>
								<li><BiChevronRight /> <Link href="#">Services</Link></li>
								<li><BiChevronRight /> <Link href="#">Terms of service</Link></li>
								<li><BiChevronRight /> <Link href="#">Privacy policy</Link></li>
							</ul>
						</div>

						<div className="col-lg-3 col-md-6 footer-links">
							<h4>Our Services</h4>
							<ul>
								<li><BiChevronRight /> <Link href="#">Custom Software Solutions</Link></li>
								<li><BiChevronRight /> <Link href="#">Web Design & Development</Link></li>
								<li><BiChevronRight /> <Link href="#">Website Analytics</Link></li>
								<li><BiChevronRight /> <Link href="#">Dashboard Development</Link></li>
								<li><BiChevronRight /> <Link href="#">Data Analysis</Link></li>
								<li><BiChevronRight /> <Link href="#">Support & Maintenance</Link></li>
							</ul>
						</div>


					</div>
				</div>
			</div>

			<div className="container">
				<div className="copyright">
					&copy; Copyright <strong><span>Lox Informatics</span></strong>. All Rights Reserved
				</div>
			</div>
		</footer>
	)
}
