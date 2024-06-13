"use client";

import styles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo/Logo";
import Navbar from "@/components/navigation/Navbar/Navbar";
import MobileNav from "@/components/navigation/MobileNav&Toggle/MobileNav&Toggle";

export default function Header({
  hasBackground = true,
  position = "sticky-top",
}) {
  const headerRef = useRef(null);
  const [background, setBackground] = useState(
    hasBackground && styles.header_bg
  );
  const [navbarNavigation, setNavbarNavigation] = useState(false);
  const pathname = usePathname();

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

  // Add Navigation if header classlist contains "hasNavbar"
  // *: The 'hasNavbar' class is toggled by the `NavType` element from `useNavigationContext()`
  useEffect(() => {
    const headerElement = headerRef.current;
    headerElement &&
      headerElement.classList.contains("hasNavbar") &&
      setNavbarNavigation(
        <>
          <div className="d-none d-lg-block">
            <Navbar />
          </div>

          <div className="d-block d-lg-none">
            <MobileNav />
          </div>
        </>
      );

    return () => {};
  }, []);

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
            {navbarNavigation}
          </Col>

          <Col
            xs={4}
            className="d-flex justify-content-center justify-content-lg-end ps-5"
          >
            <Link className={styles.forwardBtn} href="/auth?formType=login">
              Login
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

{
  /* {pathname.startsWith("/auth") ? (
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
				)} */
}
