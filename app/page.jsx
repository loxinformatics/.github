"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./page.css";

// Any imported component should come from layout components
import Header from "@/components/layout/Header/Header"
import Hero from "@/components/layout/Hero/Hero"
import About from "@/components/layout/About/About";
import Services from "@/components/layout/Services/Services";
import CallToAction from "@/components/layout/CallToAction/CallToAction"
import Contact from "@/components/layout/Contact/Contact";
import Footer from "@/components/layout/Footer/Footer"


export default function Home() {

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
			<Header></Header>
			<Hero></Hero>
			<main id="main">
				<About />
				<Services />
				<CallToAction />
				<Contact />
			</main>
			<Footer></Footer>
		</>
	)
}
