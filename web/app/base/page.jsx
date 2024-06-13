// import Image from "next/image";
// import Link from "next/link";
// import { BiLaptop, BiCodeAlt, BiBarChart, BiLineChart, BiData, BiSupport } from "react-icons/bi";
// import RiCheckDoubleLine from "react-icons/ri";

// import CallToAction from "@/components/cta/calltoaction"

"use client";

import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import Contact from "@/components/sectionContact/Contact";
import Footer from "@/components/footer/Footer";
import BottomBar from "@/components/bottombar/BottomBar";

export default function BasePage() {
  return (
    <>
      <Header position="sticky-top" />

      <Main>
        <Contact />
      </Main>

      <Footer />
      <BottomBar />
    </>
  );
}
