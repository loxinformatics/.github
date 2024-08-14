"use client";

import AboutContext from "@/custom/About/context";
import AsideContext from "@/lox/layout/Aside/context";
import ContactContext from "@/lox/layout/Contact/context";
import ServicesContext from "@/lox/layout/Services/context";
import UsersContext from "@/lox/layout/Users/context";
import ScrollTopButton from "@/lox/widgets/ScrollTopButton/ScrollTopButton";
import SocialLinksContext from "@/lox/widgets/SocialLinks/context";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { createContext, useContext, useEffect, useState } from "react";
import "./global.scss";

const appContext = createContext(null);

export default function AppContext({ children }) {
  // API URL
  const API_URL =
    process.env.NEXT_PUBLIC_DEBUG === "True"
      ? "http://127.0.0.1:8000/api"
      : "/api";

  // AOS init
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      delay: 200,
    });
  }, []);

  // window width usestate
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // window height usestate
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  // Monitor Window Width and Height on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll with offset on page load with hash links in the url
  useEffect(() => {
    const handlePageLoad = () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
          scrollto(window.location.hash);
        }
      }
    };

    // Wait for React to render and async content to settle
    const timer = setTimeout(() => {
      handlePageLoad();
    }, 100); // Use a minimal delay to ensure React has processed updates

    return () => clearTimeout(timer);
  }, []);

  // Function to scroll to an element
  const scrollto = (el) => {
    const header = document.querySelector("#header");
    const element = document.querySelector(el);
    const offset = header?.offsetHeight || 0;
    const elementPos = element?.offsetTop || 0;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  const contextData = {
    API_URL,
    windowWidth,
    windowHeight,
    scrollto,
  };

  return (
    <appContext.Provider value={contextData}>
      <UsersContext>
        <AsideContext>
          <ContactContext>
            <AboutContext>
              <ServicesContext>
                <SocialLinksContext>{children}</SocialLinksContext>
              </ServicesContext>
            </AboutContext>
          </ContactContext>
          <ScrollTopButton />
        </AsideContext>
      </UsersContext>
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}
