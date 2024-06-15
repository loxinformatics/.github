"use client";

import styles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect, useRef } from "react";
import ForwardBtn from "@/components/widgets/ForwardBtn/ForwardBtn";
import Logo from "@/components/widgets/Logo/Logo";
import Navbar from "@/components/widgets/Navbar/Navbar";
import MobileNav from "@/components/widgets/MobileNav&Toggle/MobileNav&Toggle";
import { useRootContext } from "@/app/context";
import { usePathname } from "next/navigation";

export default function Header({
  hasBackground = true,
  position = "sticky-top",
}) {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const [background, setBackground] = useState(
    hasBackground && styles.header_bg
  );

  const { navType } = useRootContext();

  // Set the background color on scroll or on resize
  useEffect(() => {
    const handleBackground = () => {
      if (window.scrollY > 10 || window.innerHeight <= 555) {
        !hasBackground && setBackground(styles.header_bg);
      } else {
        hasBackground ? setBackground(styles.header_bg) : setBackground("");
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
      ref={headerRef}
      id="header"
      className={`${styles.header} ${background} ${position}`}
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
            {navType === "navbar" && !pathname.startsWith("/auth") && (
              <>
                <div className="d-none d-lg-block">
                  <Navbar />
                </div>

                <div className="d-block d-lg-none">
                  <MobileNav />
                </div>
              </>
            )}
          </Col>

          <Col
            xs={4}
            className="d-flex justify-content-center justify-content-lg-end ps-5"
          >
            <ForwardBtn />
          </Col>
        </Row>
      </Container>
    </header>
  );
}