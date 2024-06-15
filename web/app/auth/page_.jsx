"use client";

import styles from "./page.module.css";

import Header from "@/components/layout/header/Header";
import Main from "@/components/layout/main/Main";
import Auth from "@/app/Auth/Auth/Auth";
import BottomBar from "@/components/layout/bottombar/BottomBar";
import { useAuthContext } from "./context";

export default function AuthPage() {
  const { PublicView } = useAuthContext();

  return (
    <PublicView>
      <Header hasBackground={false} />

      <Main fixAndCenter={true} background={styles.bg}>
        <Auth />
      </Main>
      <BottomBar hasBackground={false} />
    </PublicView>
  );
}
