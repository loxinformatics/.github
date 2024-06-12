"use client";

import styles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/widgets/Logo/Logo";
import { NavbarAndMobileNavModal } from "@/widgets/NavBarAndMobileNavModal/NavbarAndMobileNavModal";

export default function Header({
  hasBackground = true,
  position = "sticky-top",
}) {
  const [background, setBackground] = useState(styles.header_bg);
  const pathname = usePathname();

  useEffect(() => {
    const handleBackground = () => {
      if (window.scrollY > 5 || window.innerHeight <= 555) {
        !hasBackground && setBackground(styles.header_bg);
      } else {
        hasBackground ? setBackground(styles.header_bg) : setBackground(null);
      }
    };

    handleBackground();
    window.addEventListener("scroll", handleBackground);
    window.addEventListener("resize", handleBackground);

    return () => {
      window.removeEventListener("scroll", handleBackground);
      window.removeEventListener("resize", handleBackground);
    };
  }, [hasBackground]);

  return (
    <header
      id="header"
      className={`${styles.header} ${background} ${position} z-1`}
    >
      <Container>
        <Row className="align-items-center">
          <Col xs={4} className="d-flex justify-content-start">
            <Logo />
          </Col>

          <Col
            xs={4}
            className="d-flex justify-content-end justify-content-lg-center order-last order-lg-0"
          >
            <NavbarAndMobileNavModal />
          </Col>

          <Col
            xs={4}
            className="d-flex justify-content-center justify-content-lg-end ps-5"
          >
            {/* {pathname.startsWith("/auth") ? (
              <Button
                as={LinkButton}
                variant="outline-primary"
                href="/#"
                className="border-2 px-4 py-2 text-white"
              >
                Back Home
              </Button>
            ) : (
              <Button
                as={LinkButton}
                variant="outline-primary"
                href="/auth"
                className="border-2 px-4 py-2 text-white"
              >
                Login
              </Button>
            )} */}
            <Link className={styles.forwardBtn} href="/auth?formType=login">
              Login
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
