"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthContext from "./auth/context";
import BaseContext from "./base/context";
import ScrollTop from "@/components/widgets/ScrollTop/ScrollTop";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
  FaLock,
  FaUserGraduate,
} from "react-icons/fa";

const rootContext = createContext(null);

export default function RootContext({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [navType, setNavType] = useState("navbar");
  const pathname = usePathname();

  // Forward Button Links
  const forwardBtnLinks = [
    { path: "/", name: "Get Started", href: "/#about" },
    { path: "/auth", name: "Back Home", href: "/#hero" },
  ]

  // Navbar Links
  const navbarAndMobileLinks = [
    { name: "Home", href: "/#hero", icon: FaHome },
    { name: "About", href: "/#about", icon: FaInfoCircle },
    { name: "Services", href: "/#services", icon: FaServicestack },
    { name: "Contact", href: "/#contact", icon: FaEnvelope },
    // { name: "Schools", href: "/dashboard", icon: FaUserGraduate },
  ];

  // Sidebar Links
  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: FaUserGraduate },
  ];

  // Determine Navigation Type
  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setNavType("sidebar");
        break;
      default:
        setNavType("navbar");
        break;
    }
  }, [pathname]);

  // AOS Init
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      delay: 200,
    });
  }, []);

  // Context Data
  const contextData = {
    forwardBtnLinks,
    navbarAndMobileLinks,
    sidebarLinks,
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileNavOpen,
    setIsMobileNavOpen,
    navType,
  };

  return (
    <rootContext.Provider value={contextData}>
      <AuthContext>
        <BaseContext>
          {children} <ScrollTop />
        </BaseContext>
      </AuthContext>
    </rootContext.Provider>
  );
}

export function useRootContext() {
  return useContext(rootContext);
}

export const APIUrl =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? "https://www.loxinformatics.com/api"
    : "http://127.0.0.1:8000/api";
