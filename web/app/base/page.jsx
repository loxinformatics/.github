// import Image from "next/image";
// import Link from "next/link";
// import { BiLaptop, BiCodeAlt, BiBarChart, BiLineChart, BiData, BiSupport } from "react-icons/bi";

// import CallToAction from "@/components/cta/calltoaction"

"use client";

import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import Main from "@/components/main/Main";
import About from "@/components/sectionAbout/sectionAbout";
import Contact from "@/components/sectionContact/Contact";
import Footer from "@/components/footer/Footer";
import BottomBar from "@/components/bottombar/BottomBar";

export default function BasePage() {
  return (
    <>
      <Header position="fixed-top" hasBackground={false} />
      <Hero />
      <Main>
        <About />
        <Contact />
      </Main>

      <Footer />
      <BottomBar />
    </>
  );
}
