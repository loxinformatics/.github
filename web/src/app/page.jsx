// import Image from "next/image";
// import Link from "next/link";
// import { BiLaptop, BiCodeAlt, BiBarChart, BiLineChart, BiData, BiSupport } from "react-icons/bi";
// import RiCheckDoubleLine from "react-icons/ri";

// import CallToAction from "@/layout/cta/calltoaction"

"use client";

/* Include required global components
------------------------------*/
import Main from "@/app/global/main/main";


/* Optionally Include node_modules and packages
------------------------------*/
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";


/* Optionally Include custom styling
------------------------------*/


/* Optionally include global ui components with their widgets as needed
------------------------------*/
import Header, {
	Logo,
	NavBarAndMobileNavToggle,
} from "@/app/global/header/header";

import Footer, {
	FooterContent,
	UsefulLinks,
	ServicesLinks,
} from "@/app/global/footer/footer";

import BottomBar, {
	Copyright,
	SocialLinks,
} from "@/app/global/bottombar/bottombar";


/* Optionally include section context providers and ui components with their widgets as needed
------------------------------*/
import ContactSection, {
	ContactContent,
	MailForm,
} from "@/app/contact/section/contact";


/* Optionally include shared ui components to nest in any block component
------------------------------*/
import Button from "@/app/utils/button/button";
import Title from "@/app/utils/title/title";


export default function HomePage() {

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
			mirror: false
		});
	}, []);

	return (
		<>
			<Header>
				<div className=" d-flex align-items-center">
					<div className="me-auto">
						<Logo />
					</div>
					<div className="order-last order-lg-0">
						<NavBarAndMobileNavToggle />
					</div>
					<div className="ms-auto">
						<Button name="Get Started" href="/#about" />
					</div>
				</div>
			</Header>

			<Main>
				<ContactSection>
					<Title heading="Contact" paragraph="Contact Us" />

					<div className="row">
						<div className="col-lg-4" data-aos="fade-up">
							<ContactContent />
						</div>

						<div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-up">
							<MailForm />
						</div>
					</div>
				</ContactSection>

			</Main>

			<Footer>
				<div className="row">
					<div className="col-lg-3 col-md-6 mb-0 mb-md-4">
						<FooterContent />
					</div>

					<div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
						<UsefulLinks />
					</div>

					<div className="col-lg-3 col-md-6 mb-md-4 mb-lg-0">
						<ServicesLinks />
					</div>
				</div>
			</Footer>

			<BottomBar>
				<div className="">
					<SocialLinks />
				</div>

				<div className="">
					<Copyright />
				</div>
			</BottomBar>

		</>
	)
}
