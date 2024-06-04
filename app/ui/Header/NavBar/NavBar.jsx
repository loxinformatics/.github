"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { BsX, BsList } from "react-icons/bs";
import "./styles.css";

export default function NavBar({ links }) {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const pathname = usePathname();

	const toggleMobileNav = () => {
		setIsMobileNavOpen(!isMobileNavOpen);
	};

	// Function to scroll to an element with header offset
	const scrollto = (el) => {
		const header = document.querySelector("#header");
		if (!header) return;

		const offset = header.offsetHeight;
		const element = document.querySelector(el);
		if (!element) return;

		const elementPos = element.offsetTop - 45;
		window.scrollTo({
			top: elementPos - offset,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const navbarlinks = document.querySelectorAll("#navbar .scrollto");

		// Check the scroll position on mount and add the active state event listener
		const navbarlinksActive = () => {
			const position = window.scrollY + 200;
			navbarlinks.forEach(navbarlink => {
				if (!navbarlink.hash) return;
				const section = document.querySelector(navbarlink.hash);
				if (!section) return;
				if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
					navbarlink.classList.add("active");
				} else {
					navbarlink.classList.remove("active");
				}
			});
		};

		window.addEventListener("load", navbarlinksActive);
		document.addEventListener("scroll", navbarlinksActive);

		// Scroll with offset on  links with a class name .scrollto (when a .scrollto link is clicked, that is)
		const handleClick = (e) => {
			const target = e.target;
			if (target.classList.contains("scrollto") && target.hash && document.querySelector(target.hash)) {
				e.preventDefault();
				const navbar = document.querySelector("#navbar");
				if (navbar && navbar.classList.contains("navbar-mobile")) {
					navbar.classList.remove("navbar-mobile");
					setIsMobileNavOpen(false);
				}
				scrollto(target.hash);
			}
		};

		document.addEventListener("click", handleClick);

		// Scroll with offset on page load with hash links in the url
		const handlePageLoad = () => {
			if (window.location.hash && document.querySelector(window.location.hash)) {
				scrollto(window.location.hash);
			}
		};

		handlePageLoad()
		window.addEventListener("load", handlePageLoad);

		return () => {
			window.removeEventListener("load", handlePageLoad);
			window.removeEventListener("load", navbarlinksActive);
			document.removeEventListener("scroll", navbarlinksActive);
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<nav id="navbar" className={`navbar order-last order-lg-0 ${isMobileNavOpen ? "navbar-mobile" : ""}`}>
			<ul>
				{links.map((link) => (
					<li key={link.name}>
						<Link
							href={link.href}
							className={clsx("nav-link scrollto", {
								"active": pathname === link.href,
							})}
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
			<div className="mobile-nav-toggle" onClick={toggleMobileNav}>
				{isMobileNavOpen ? <BsX /> : <BsList />}
			</div>
		</nav>
	);
}
