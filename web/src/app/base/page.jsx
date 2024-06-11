// import Image from "next/image";
// import Link from "next/link";
// import { BiLaptop, BiCodeAlt, BiBarChart, BiLineChart, BiData, BiSupport } from "react-icons/bi";
// import RiCheckDoubleLine from "react-icons/ri";

// import CallToAction from "@/layout/cta/calltoaction"

"use client";

// packages
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import Header from "@/layout/Header/Header";
import Aside from "@/layout/Aside/Aside";
import Main from "@/layout/Main/Main";
import ContactSection from "@/layout/ContactSection/ContactSection";
import Footer from "@/layout/Footer/Footer";
import BottomBar from "@/layout/BottomBar/BottomBar";

export default function BasePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <>
      <Header position="sticky-top" />
      <Main>
        <ContactSection />
      </Main>
      <Footer />
      <BottomBar />
    </>
  );
}
