"use client";

import Image from "next/image";
import Link from "next/link";
import { BiLaptop, BiCodeAlt, BiBarChart, BiLineChart, BiData, BiSupport } from "react-icons/bi";
import {
	RiCheckDoubleLine,
	RiCodeBoxLine,
	RiBarChartBoxLine,
	RiCpuLine,
	RiDatabase2Line,
	RiGlobalLine,
} from "react-icons/ri";
import { BsGeoAlt, BsEnvelope, BsPhone } from "react-icons/bs";
import SectionTitle from "@/app/ui/SectionTitle/SectionTitle";
import MailUsForm from "@/app/ui/MailUsForm/MailUsForm";
import CallToAction from "@/app/ui/CallToAction/CallToAction"
import { useRootcontext } from "@/app/context";

import "aos/dist/aos.css";
import "./page.css";
import AOS from "aos";
import { useEffect } from "react";

import Header from "@/app/ui/header/header";
import Logo from "@/app/ui/header/logo/logo";
import ForwardBtn from "@/app/ui/header/forwardbtn/forwardbtn";
import NavBarAndMobileNavToggle from "@/app/ui/header/navbar/navbar";

import Footer from "@/app/ui/footer/footer";
import FooterInfo from "@/app/ui/footer/footerinfo/footerinfo";
import UsefulLinks from "@/app/ui/footer/footerlinks/usefullinks";
import ServicesLinks from "@/app/ui/footer/footerlinks/serviceslinks";
import SocialLinks from "@/app/ui/footer/sociallinks/sociallinks";

import CopyrightAndOrCredits from "@/app/ui/copyrightandorcredits/copyrightandorcredits";


export default function Page() {
	const { root } = useRootcontext();

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
			<Header position="fixed">
				<div className="me-auto">
					<Logo />
				</div>
				<div className="order-last order-lg-0">
					<NavBarAndMobileNavToggle />
				</div>
				<div className="ms-auto">
					<ForwardBtn name="Get Started" href="/#about" />
				</div>
			</Header>

			{/* Hero */}
			<section id="hero" className="d-flex align-items-center justify-content-center">
				<div className="container" data-aos="fade-up">

					<div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
						<div className="col-xl-6 col-lg-8">
							<h1 className="smaller-heading">Transforming Retail & E-Commerce Landscapes<span>:</span> Innovative
								Solutions and
								Insights for Success</h1>
							<h2>We are a team of talented software developers and analysts dedicated to revolutionizing the way
								retail and
								e-commerce businesses thrive.</h2>
						</div>
					</div>

					<div className="row gy-4 mt-5 justify-content-center" data-aos="zoom-in" data-aos-delay="250">
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<RiCodeBoxLine />
								<h3><Link className="pe-none" href="">Software Development</Link></h3>
							</div>
						</div>
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<RiBarChartBoxLine />
								<h3><Link className="pe-none" href="">Business Analysis</Link></h3>
							</div>
						</div>
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<RiCpuLine />
								<h3><Link className="pe-none" href=""> Automated Systems</Link></h3>
							</div>
						</div>
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<RiDatabase2Line />
								<h3><Link className="pe-none" href="">Statistical Analysis</Link></h3>
							</div>
						</div>
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<RiGlobalLine />
								<h3><Link className="pe-none" href="">Website Optimization</Link></h3>
							</div>
						</div>
					</div>

				</div>
			</section>

			<main id="main">

				{/* About */}
				<section id="about" className="about">
					<div className="container" data-aos="fade-up">

						<SectionTitle heading="About" paragraph="About Us" />

						<div className="row">
							<div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
								<Image src="/images/tech11.jpg" className="img-fluid" alt="" width={500} height={355} />
							</div>
							<div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right"
								data-aos-delay="100">
								<h3>Why you should choose to work with us</h3>
								<p className="fst-italic">
									At Lox Informatics, our mission is to empower retail and e-commerce businesses to harness
									the
									full potential of their online presence through comprehensive data analysis and tailored Web
									solutions.
								</p>
								<p className="fst-italic">
									Our Company bridges the gap between data and impact. Helping businesses connect with their
									audience on
									a deeper level and guiding them in transforming their data into tangible value through:
								</p>
								<ul>
									<li><RiCheckDoubleLine /> personalized content </li>
									<li><RiCheckDoubleLine /> informed design and optimized websites</li>
									<li><RiCheckDoubleLine /> Actionable insights and measurable results.</li>
								</ul>
								<p className="fst-italic">
									Our company brings together a unique blend of skills and experience to
									provide cutting edge solutions in the digital realm and offer a comprehensive suite of
									services
									that focus on delivering results.
								</p>
							</div>
						</div>

					</div>
				</section>

				{/* Services */}
				<section id="services" className="services">
					<div className="container" data-aos="fade-up">

						<SectionTitle heading="Services" paragraph="Check our Services" />

						<div className="row">
							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="200">
								<div className="icon-box">
									<div className="icon"><BiLaptop /></div>
									<h4>Custom Software Solutions</h4>
									<p>We tailor our services to meet the specific needs and goals of each client. </p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="100">
								<div className="icon-box">
									<div className="icon"><BiCodeAlt /></div>
									<h4>Web design and development</h4>
									<p>We use data insights to optmisze user experiences and website functionality</p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="200">
								<div className="icon-box">
									<div className="icon"><BiBarChart /></div>
									<h4>Website analytics & user behaviour analysis</h4>
									<p>We focus on understanding user behaviour and website performance through data analytics.
									</p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="300">
								<div className="icon-box">
									<div className="icon"><BiLineChart /></div>
									<h4>Dashboard development and reporting</h4>
									<p>We offer custom dashboard development for live
										reporting to suit any business needs together with data visualization services</p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="100">
								<div className="icon-box">
									<div className="icon"><BiData /></div>
									<h4>Data analytics and statistical modelling</h4>
									<p>Our team leverages advanced analytics tools and methodologies to dissect website data,
										uncover trends,
										and extract valuable insights.</p>
								</div>
							</div>


							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="300">
								<div className="icon-box">
									<div className="icon"><BiSupport /></div>
									<h4>Support and maintenance</h4>
									<p> We will also offer post-project support, updates and maintenance services for software
										created and
										other data solutions.</p>
								</div>
							</div>

						</div>

					</div>
				</section>

				<CallToAction
					heading="Reach Out"
					paragraph="Contact us now for a free consultation"
					button="Get in Touch"
					href="https://wa.me/254710289954"
				/>

				{/* Contact */}
				<section id="contact" className="contact">
					<div className="container" data-aos="fade-up">

						<SectionTitle heading="Contact" paragraph="Contact Us" />

						<div className="row mt-5">

							<div className="col-lg-4">
								<div className="info">

									{root.city_name && (
										<div className="address">
											<div className="icon"><BsGeoAlt /></div>
											<h4>Location:</h4>
											<p>{root.city_name}</p>
										</div>
									)}

									{root.primary_email && (
										<div className="email">
											<div className="icon"><BsEnvelope /></div>
											<h4>Email:</h4>
											<Link href={`mailto:${root.primary_email}`}>
												<p>{root.primary_email}</p>
											</Link>
											{root.secondary_email && (
												<Link href={`mailto:${root.secondary_email}`}>
													<p>{root.secondary_email}</p>
												</Link>
											)}
										</div>
									)}

									{root.primary_phone && root.secondary_phone && (
										<div className="phone">
											<div className="icon"><BsPhone /></div>
											<h4>Call:</h4>
											<Link href={`tel:${root.primary_phone}`}>
												<p>{root.primary_phone}</p>
											</Link>
											<Link href={`tel:${root.secondary_phone}`}>
												<p>{root.secondary_phone}</p>
											</Link>
										</div>
									)}

								</div>
							</div>

							<div className="col-lg-8 mt-5 mt-lg-0">
								<MailUsForm />
							</div>

						</div>

					</div>
				</section>

			</main>

			<Footer>
				<div className="col-lg-3 col-md-6 mb-0 mb-md-4">
					<FooterInfo />
				</div>

				<div className="d-lg-none col-md-6 mb-4">
					<SocialLinks />
				</div>

				<div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
					<UsefulLinks />
				</div>

				<div className="col-lg-3 col-md-6 mb-md-4 mb-lg-0">
					<ServicesLinks />
				</div>

				<div className="d-none d-lg-block">
					<SocialLinks />
				</div>
			</Footer>

			<CopyrightAndOrCredits />

		</>
	)
}
