"use client";

import styles from "./footer.module.css";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import BaseContext, { useBaseContext } from "@/app/context";
import ContactContext, { useContactContext } from "@/app/contact/context";


export default function Footer({ children, position }) {

	return (
		<BaseContext>
			<ContactContext>
				<footer id="footer" className={`${styles.footer} ${position && "position-" + position}`}>
					<div className="container">
						<div className="row">
							{children}
						</div>
					</div>
				</footer>
			</ContactContext>
		</BaseContext>
	);
}

export function FooterContent() {
	const { base } = useBaseContext();
	const name = base?.name
	const motto = base?.motto

	const { contact_info } = useContactContext();
	const primary_phone = contact_info?.primary_phone
	const secondary_phone = contact_info?.secondary_phone
	const primary_email = contact_info?.primary_email
	const secondary_email = contact_info?.secondary_email

	return (
		<>
			<h3 className={styles.footercontent_h3}>
				{name ? name : (<span>Your Company</span>)}
				<span className="text-primary">.</span>
			</h3>

			{/* {motto && (<p className={styles.footercontent_p}>{motto}</p>)} */}

			<div className="mb-3">
				<strong>Call:</strong><br />
				{primary_phone && (<div>{primary_phone}</div>)}
				{secondary_phone && (<div>{secondary_phone}</div>)}

				<br />

				<strong>Email:</strong><br />
				{primary_email && (<div>{primary_email}</div>)}
				{secondary_email && (<div>{secondary_email}</div>)}
			</div>
		</>
	);
}


export function UsefulLinks() {
	return (
		<>
			<h4 className={styles.footerlinks_h4}>Useful Links</h4>
			<ul className="list-unstyled m-0 p-0">
				<li className={styles.footerlinks_li}><BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="/#hero">Home</Link></li>
				<li className={styles.footerlinks_li}><BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="/#about">About us</Link></li>
				<li className={styles.footerlinks_li}><BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="/#services">Services</Link></li>
				{/* <li className={styles.footerlinks_li}><BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Terms of service</Link></li> */}
				{/* <li className={styles.footerlinks_li}><BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Privacy policy</Link></li> */}
			</ul>
		</>
	);
}


export function ServicesLinks() {
	return (
		<>
			<h4 className={styles.footerlinks_h4}>Our Services</h4>
			<ul className="list-unstyled m-0 p-0">
				<li className={styles.footerlinks_li}>
					<BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Custom Software Solutions</Link>
				</li>
				<li className={styles.footerlinks_li}>
					<BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Web Design & Development</Link></li>
				<li className={styles.footerlinks_li}>
					<BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Website Analytics</Link>
				</li>
				<li className={styles.footerlinks_li}>
					<BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Dashboard Development</Link>
				</li>
				<li className={styles.footerlinks_li}>
					<BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Data Analysis</Link>
				</li>
				<li className={styles.footerlinks_li}>
					<BiChevronRight className={styles.footerlinks_svg} /> <Link className={styles.footerlinks_a} href="#">Support & Maintenance</Link>
				</li>
			</ul>
		</>
	);
}
