"use client";

import styles from "./page.module.css";

import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { useAuthContext } from "@/app/auth/context";

import Header from "@/layout/Header/Header";
import Main from "@/layout/Main/Main";
import AuthSection from "@/layout/AuthSection/AuthSection";
import BottomBar from "@/layout/BottomBar/BottomBar";

export default function AuthPage() {
  const { PublicView } = useAuthContext();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <PublicView>
      <Header hasBackground={false} />

      <Main fixAndCenter={true} background={styles.bg}>
        <AuthSection />
      </Main>

      <BottomBar hasBackground={false} />
    </PublicView>
  );
}
