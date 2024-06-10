"use client";

/* Include required global ui components
------------------------------*/
import Main from "@/app/global/main/main";

/* Optionally Include node_modules and packages
------------------------------*/
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/* Optionally Include custom styling
------------------------------*/
import styles from "./page.module.css";

/* Optionally include context and utils
------------------------------*/
import PublicRoute from "./utils/publicroute/publicroute";

/* Optionally include global ui components with their widgets as needed
------------------------------*/
import Header, { Logo, NavBarAndMobileNavToggle } from "@/app/global/header/header";
import BottomBar, { Copyright, SocialLinks } from "@/app/global/bottombar/bottombar";

/* Optionally include section context providers and ui components with their widgets as needed
------------------------------*/
import AuthSection, { LoginForm, SignupForm } from "@/app/auth/section/auth";

/* Optionally include shared ui components to nest in any block component
------------------------------*/
import Button from "@/app/utils/button/button";

export default function AuthPage() {
    const searchParams = useSearchParams();
    const authForm = searchParams.get("formType") === "signup" ? <SignupForm /> : <LoginForm />;

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }, []);

    return (
        <PublicRoute>
            <Header hasBackground={false}>
                <div className=" d-flex align-items-center">
                    <div className="me-auto">
                        <Logo />
                    </div>
                    <div className="order-last order-lg-0">
                        <NavBarAndMobileNavToggle />
                    </div>
                    <div className="ms-auto">
                        <Button name="Back Home" href="/#hero" />
                    </div>
                </div>
            </Header>

            <Main fixAndCenter={true} background={styles.bg}>

                <AuthSection>
                    <div className="row">
                        <div className="mx-auto col-12 col-sm-10 col-md-8 col-lg-6">
                            {authForm}
                        </div>
                    </div>
                </AuthSection>

            </Main>

            <BottomBar hasBackground={false}>
                <Copyright />
            </BottomBar>

        </PublicRoute>
    );
}