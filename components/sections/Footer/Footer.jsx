"use client";

import Link from "next/link";
import { BsTwitterX, BsFacebook, BsLinkedin } from "react-icons/bs";
import { BiChevronRight } from "react-icons/bi";
import "./Footer.css";


export default function Footer() {
	return (
		<footer id="footer">
			<div className="footer-top">
				<div className="container">
					<div className="row">

						<div className="col-lg-3 col-md-6">
							<div className="footer-info">
								<h3>Lox Informatics<span>.</span></h3>
								<div>
									<strong>Call:</strong><br />
									<div>+254710289954</div>
									<div>+254706965904</div><br />
									<strong>Email:</strong><br />
									<div>info@loxinformatics.com</div>
								</div>
								<div className="social-links mt-3">
									<Link href="#" className="twitter"><BsTwitterX /></Link>
									<Link href="#" className="facebook"><BsFacebook /></Link>
									<Link href="#" className="linkedin"><BsLinkedin /></Link>
								</div>
							</div>
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
