"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { AuthContext } from "@/app/auth/context";
import { BaseContext } from "@/app/base/context";
import { ScrollTop } from "@/widgets/ScrollTop/ScrollTop";
import { Preloader } from "@/widgets/Preloader/Preloader";

const APIUrl =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? "https://www.loxinformatics.com/api"
    : "http://127.0.0.1:8000/api";

export { APIUrl };

export function RootContext({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
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
