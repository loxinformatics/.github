// import Image from "next/image";
// import Link from "next/link";

// import CallToAction from "@/components/cta/calltoaction"

"use client";

import Header from "@/components/layout/header/Header";
import Hero from "@/app/base/Hero/Hero";
import Main from "@/components/layout/main/Main";
import About from "@/app/base/About/About";
import Services from "@/app/base/Services/Services";
import CTA from "@/components/widgets/CTA/CTA";
import Contact from "@/app/base/Contact/Contact";
import Footer from "@/components/layout/footer/Footer";
import BottomBar from "@/components/layout/bottombar/BottomBar";

export default function BasePage() {
  return (
    <>
      <Header position="fixed-top" hasBackground={false} />

      <Main>
        <Hero />
        <About />
        <Services />
        <CTA
          heading="Reach Out"
          paragraph="Contact us now for a free consultation"
          button="Get in Touch"
          href="https://wa.me/254710289954"
        />
        <Contact />
      </Main>
      <Footer />
      <BottomBar />
    </>
  );
}
