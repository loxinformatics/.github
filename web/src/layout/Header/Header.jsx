"use client";

import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { Logo } from "@/widgets/Logo/Logo";
import { NavbarAndMobileNav } from "@/widgets/NavBarAndMobileNav/NavbarAndMobileNav";
import { Button } from "@/widgets/Button/Button";

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
            <NavbarAndMobileNav />
          </Col>

          <Col
            xs={4}
            className="d-flex justify-content-center justify-content-lg-end ps-5"
          >
            <Button
              name={pathname.startsWith("/auth") ? "Back Home" : "Get Started"}
              href={pathname.startsWith("/auth") ? "/#" : "/#about"}
            />
          </Col>
        </Row>
      </Container>
    </header>
  );
}
