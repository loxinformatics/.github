"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AuthContext from "./auth/context";
import BaseContext from "./base/context";
import ScrollTop from "../components/shared/ScrollTop/ScrollTop";
import Preloader from "../components/shared/Preloader/Preloader";

const APIUrl =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? "https://www.loxinformatics.com/api"
    : "http://127.0.0.1:8000/api";

export { APIUrl };

export default function RootContext({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      delay: 200,
    });
  }, []);

  return (
    <AuthContext>
      <BaseContext>
        {children}
        <ScrollTop />
        <Preloader />
      </BaseContext>
    </AuthContext>
  );
}
