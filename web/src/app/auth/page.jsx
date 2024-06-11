"use client";

import styles from "./page.module.css";

import Header from "@/layout/Header/Header";
import Main from "@/layout/Main/Main";
import AuthSection from "@/layout/AuthSection/AuthSection";
import BottomBar from "@/layout/BottomBar/BottomBar";
import { useAuthContext } from "@/app/auth/context";

export default function AuthPage() {
  const { PublicView } = useAuthContext();

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
