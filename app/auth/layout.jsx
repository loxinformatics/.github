import styles from "./layout.module.css"

import Header from "@/app/ui/header/header";
import Logo from "@/app/ui/header/logo/logo";
import ForwardBtn from "@/app/ui/header/forwardbtn/forwardbtn";
import NavBarAndMobileNavToggle from "@/app/ui/header/navbar/navbar";

import Section from "@/app/auth/ui/section/section";
import PublicRoute from "@/app/auth/ui/utils/publicroute";


export default function Layout({ children }) {
    return (
        <PublicRoute>
            <div className="vh-100 d-flex flex-column">
                <main id="main" className={`${styles.auth} flex-grow-1 position-relative container-fluid d-flex flex-column`}>

                    <Header>
                        <div className="me-auto">
                            <Logo />
                        </div>
                        <div className="order-last order-lg-0">
                            <NavBarAndMobileNavToggle />
                        </div>
                        <div className="ms-auto">
                            <ForwardBtn name="Go Back" href="/#hero" />
                        </div>
                    </Header>

                    <Section>
                        {children}
                    </Section>

                </main>
            </div>
        </PublicRoute >
    );
}
