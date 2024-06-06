"use client";

/* Include required global ui components
------------------------------*/
import Main from "@/app/ui/main/main";


/* Optionally Include node_modules and packages
------------------------------*/
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";


/* Optionally Include custom styling
------------------------------*/
import styles from "./page.module.css"


/* Optionally include context and utils
------------------------------*/
import PublicRoute from "./utils/publicroute/publicroute";


/* Optionally include global ui components with their widgets as needed
------------------------------*/
import Header, {
    Logo,
    NavBarAndMobileNavToggle,
} from "@/app/ui/header/header";


/* Optionally include section context providers and ui components with their widgets as needed
------------------------------*/
import AuthSection, {
    LoginForm,
    SignupForm,
} from "@/app/auth/ui/auth";


/* Optionally include shared ui components to nest in any block component
------------------------------*/
import Button from "@/app/utils/button/button";


export default function AuthPage() {

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

            <Header position="fixed-top">
                <div className="me-auto">
                    <Logo />
                </div>
                <div className="order-last order-lg-0">
                    <NavBarAndMobileNavToggle />
                </div>
                <div className="ms-auto">
                    <Button name="Go Back" href="/#hero" />
                </div>
            </Header>

            <div className="vh-100 d-flex flex-column">
                <main id="main" className={`${styles.auth} flex-grow-1 position-relative container-fluid d-flex flex-column`}>

                    <AuthSection>
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6" data-aos="fade-in">
                            <div className="card">
                                <div className="card-body py-4">
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </AuthSection>

                </main>
            </div>
        </PublicRoute >
    );
}
