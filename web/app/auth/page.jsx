"use client";

import styles from "./page.module.css";

import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import Auth from "@/components/sectionAuth/Auth";
import BottomBar from "@/components/bottombar/BottomBar";
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
