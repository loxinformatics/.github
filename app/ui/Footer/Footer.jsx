"use client";

import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import "./styles.css";

import Copyright from "@/app/ui/Footer/Copyright/Copyright";
import SocialLinks from "@/app/ui/Footer/SocialLinks/SocialLinks";

export default function Footer({ root }) {

	return (
		<footer id="footer">
			<div className="footer-top">
				<div className="container">
					<div className="row">

						<div className="col-lg-3 col-md-6">
							<div className="footer-info">

								{root.name && (<h3>{root.name}<span>.</span></h3>)}

								<div className="mb-3">

									{root.primary_phone && root.secondary_phone && (
										<>
											<strong>Call:</strong><br />
											<div>{root.primary_phone}</div>
											<div>{root.secondary_phone}</div><br />
										</>
									)}

									{root.primary_email && (
										<>
											<strong>Email:</strong><br />
											<div>{root.primary_email}</div>
											{root.secondary_email && (<div>{root.secondary_email}</div>)}
										</>
									)}

								</div>
								<SocialLinks root={root} />
							</div>
						</div>

						<div className="col-lg-2 col-md-6">
							<div className="footer-links">
								<h4>Useful Links</h4>
								<ul>
									<li><BiChevronRight /> <Link href="/#hero">Home</Link></li>
									<li><BiChevronRight /> <Link href="/#about">About us</Link></li>
									<li><BiChevronRight /> <Link href="/#services">Services</Link></li>
									{/* <li><BiChevronRight /> <Link href="#">Terms of service</Link></li>
								<li><BiChevronRight /> <Link href="#">Privacy policy</Link></li> */}
								</ul>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">
							<div className="footer-links">
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
			</div>

			<div className="container">
				<Copyright root={root} />
			</div>
		</footer>
	)
}
