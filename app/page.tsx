'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import Image from 'next/image';
import Link from 'next/link';
import 'aos/dist/aos.css';
import './page.module.css';


export default function Home() {
	useEffect(() => {
		AOS.init({
			duration: 600,
			easing: "ease-in-out"
		});
	}, []);

	return (
		<>
			{/* ======= Header ======= */}
			<header id="header" className="fixed-top ">
				<div className="container d-flex align-items-center justify-content-lg-between">

					<h1 className="logo me-auto me-lg-0"><Link href="index.html">Lox<span>.</span></Link></h1>
					{/* Uncomment below if you prefer to use an image logo */}
					{/* <Link href="index.html" className="logo me-auto me-lg-0"><img src="/logo.png" alt="" className="img-fluid"></> */}

					<nav id="navbar" className="navbar order-last order-lg-0">
						<ul>
							<li><Link className="nav-link scrollto active" href="#hero">Home</Link></li>
							<li><Link className="nav-link scrollto" href="#about">About</Link></li>
							<li><Link className="nav-link scrollto" href="#services">Services</Link></li>
							<li><Link className="nav-link scrollto" href="#contact">Contact</Link></li>
						</ul>
						<i className="bi bi-list mobile-nav-toggle"></i>
					</nav>{/* .navbar */}

					<Link href="#about" className="get-started-btn scrollto">Get Started</Link>

				</div>
			</header>{/* End Header */}

			{/* ======= Hero Section ======= */}
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
								<i className="ri-code-line"></i>
								<h3><Link href="">Software Development</Link></h3>
							</div>
						</div>
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<i className="ri-bar-chart-box-line"></i>
								<h3><Link href="">Business Analysis</Link></h3>
							</div>
						</div>
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<i className="ri-cpu-line"></i>
								<h3><Link href=""> Automated Systems</Link></h3>
							</div>
						</div>
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<i className="ri-database-2-line"></i>
								<h3><Link href="">Statistical Analysis</Link></h3>
							</div>
						</div>
						<div className="col-xl-2 col-md-4">
							<div className="icon-box">
								<i className="ri-global-line"></i>
								<h3><Link href="">Website Optimization</Link></h3>
							</div>
						</div>
					</div>

				</div>
			</section>{/* End Hero */}

			<main id="main">

				{/* ======= About Section ======= */}
				<section id="about" className="about">
					<div className="container" data-aos="fade-up">

						<div className="section-title">
							<h2>About</h2>

						</div>

						<div className="row">
							<div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
								<Image src="/tech11.jpg" className="img-fluid" alt="" width={500} height={500} />
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
									<li><i className="ri-check-double-line"></i> personalized content </li>
									<li><i className="ri-check-double-line"></i> informed design and optimized websites</li>
									<li><i className="ri-check-double-line"></i> Actionable insights and measurable results.</li>
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
				</section>{/* End About Section */}

				{/* ======= Services Section ======= */}
				<section id="services" className="services">
					<div className="container" data-aos="fade-up">

						<div className="section-title">
							<h2>Services</h2>
							<p>Check our Services</p>
						</div>

						<div className="row">
							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="200">
								<div className="icon-box">
									<div className="icon"><i className="bx bx-laptop"></i></div>
									<h4>Custom Software Solutions</h4>
									<p>We tailor our services to meet the specific needs and goals of each client. </p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="100">
								<div className="icon-box">
									<div className="icon"><i className="bx bx-code-alt"></i></div>
									<h4>Web design and development</h4>
									<p>We use data insights to optmisze user experiences and website functionality</p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="200">
								<div className="icon-box">
									<div className="icon"><i className="bx bx-bar-chart"></i></div>
									<h4>Website analytics & user behaviour analysis</h4>
									<p>We focus on understanding user behaviour and website performance through data analytics.
									</p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="300">
								<div className="icon-box">
									<div className="icon"><i className="bx bx-line-chart"></i></div>
									<h4>Dashboard development and reporting</h4>
									<p>We offer custom dashboard development for live
										reporting to suit any business needs together with data visualization services</p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="100">
								<div className="icon-box">
									<div className="icon"><i className="bx bx-data"></i></div>
									<h4>Data analytics and statistical modelling</h4>
									<p>Our team leverages advanced analytics tools and methodologies to dissect website data,
										uncover trends,
										and extract valuable insights.</p>
								</div>
							</div>


							<div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in"
								data-aos-delay="300">
								<div className="icon-box">
									<div className="icon"><i className="bx bx-support"></i></div>
									<h4>Support and maintenance</h4>
									<p> We will also offer post-project support, updates and maintenance services for software
										created and
										other data solutions.</p>
								</div>
							</div>

						</div>

					</div>
				</section>{/* End Services Section */}

				{/* ======= Cta Section ======= */}
				<section id="cta" className="cta">
					<div className="container" data-aos="zoom-in">

						<div className="text-center">
							<h3>Call To Action</h3>
							<p> Contact us now for a free consultation</p>
							<Link className="cta-btn" href="#">Call To Action</Link>
						</div>

					</div>
				</section>{/* End Cta Section */}

				{/* ======= Contact Section ======= */}
				<section id="contact" className="contact">
					<div className="container" data-aos="fade-up">

						<div className="section-title">
							<h2>Contact</h2>
							<p>Contact Us</p>
						</div>

						<div className="row mt-5">

							<div className="col-lg-4">
								<div className="info">
									<div className="address">
										<i className="bi bi-geo-alt"></i>
										<h4>Location:</h4>
										<p>Nairobi</p>
									</div>

									<div className="email">
										<i className="bi bi-envelope"></i>
										<h4>Email:</h4>
										<Link href="mailto:info@loxinformatics.com">
											<p>info@loxinformatics.com</p>
										</Link>
									</div>

									<div className="phone">
										<i className="bi bi-phone"></i>
										<h4>Call:</h4>
										<Link href="tel:+254710289954">
											<p>+254710289954</p>
										</Link>
										<Link href="tel:+254706965904">
											<p>+254706965904</p>
										</Link>
									</div>

								</div>

							</div>

							<div className="col-lg-8 mt-5 mt-lg-0">

								<form action="http://127.0.0.1:8000/mail/contact-us/" method="post" role="form"
									className="contactform" noValidate>
									<div className="mt-2">
										<div className="loading text-center d-none">
											<div className="spinner-border text-primary" role="status">
												<span className="visually-hidden">Loading...</span>
											</div>
										</div>
										<div className="alert alert-danger text-center d-none"></div>
										<div className="alert alert-success text-center d-none"></div>
									</div>
									<div className="row">
										<div className="col-md-6 form-group">
											<input type="text" name="name" className="form-control" id="id_name"
												placeholder="Your Name" required />
											<div className="invalid-feedback name-feeback">Enter your name.</div>
										</div>
										<div className="col-md-6 form-group mt-3 mt-md-0">
											<input type="email" className="form-control" name="email" id="id_email"
												placeholder="Your Email" required />
											<div className="invalid-feedback email-feedback">Enter a valid email address.</div>
										</div>
									</div>
									<div className="form-group mt-3">
										<input type="text" className="form-control" name="subject" id="id_subject"
											placeholder="Subject" required />
										<div className="invalid-feedback subject-feedback">Enter a subject.</div>
									</div>
									<div className="form-group mt-3">
										<textarea className="form-control" name="message" id="id_message"
											placeholder="Message" required></textarea>
										<div className="invalid-feedback message-feedback">Enter a message.</div>
									</div>
									<div><input type="text" name="recipient_email" id="id_recipient_email" hidden /></div>
									<div className="text-center"><button type="submit">Send Message</button></div>
								</form>

							</div>

						</div>

					</div>
				</section>{/* End Contact Section */}

			</main>{/* End #main */}


			{/* ======= Footer ======= */}
			<footer id="footer">
				<div className="footer-top">
					<div className="container">
						<div className="row">

							<div className="col-lg-3 col-md-6">
								<div className="footer-info">
									<h3>Lox Informatics<span>.</span></h3>
									<p>
										<strong>Call:</strong><br />
										<div>+254710289954</div>
										<div>+254706965904</div><br />
										<strong>Email:</strong><br />
										<div>info@loxinformatics.com</div>
									</p>
									<div className="social-links mt-3">
										<Link href="#" className="twitter"><i className="bx bxl-twitter"></i></Link>
										<Link href="#" className="facebook"><i className="bx bxl-facebook"></i></Link>
										<Link href="#" className="google-plus"><i className="bx bxl-skype"></i></Link>
										<Link href="#" className="linkedin"><i className="bx bxl-linkedin"></i></Link>
									</div>
								</div>
							</div>

							<div className="col-lg-2 col-md-6 footer-links">
								<h4>Useful Links</h4>
								<ul>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Home</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">About us</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Services</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Terms of service</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Privacy policy</Link></li>
								</ul>
							</div>

							<div className="col-lg-3 col-md-6 footer-links">
								<h4>Our Services</h4>
								<ul>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Custom Software Solutions</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Web Design & Development</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Website Analytics</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Dashboard Development</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Data Analysis</Link></li>
									<li><i className="bx bx-chevron-right"></i> <Link href="#">Support & Maintenance</Link></li>
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
			</footer>{/* End Footer */}

			<div id="preloader"></div>
			<Link href="#" className="back-to-top d-flex align-items-center justify-content-center"><i
				className="bi bi-arrow-up-short"></i></Link>
		</>
	)
}