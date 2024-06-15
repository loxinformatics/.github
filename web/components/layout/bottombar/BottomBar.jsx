"use client";

import styles from "./BottomBar.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import SocialLinks from "@/components/widgets/SocialLinks/SocialLinks";
import Copyright from "@/components/widgets/Copyright/Copyright";

export default function BottomBar({ hasBackground = true }) {
  const [background, setBackground] = useState(hasBackground && styles.bottombar_bg);

  useEffect(() => {
    const handleBackground = () => {
      if (window.innerHeight <= 555) {
        !hasBackground && setBackground(styles.bottombar_bg);
      } else {
        hasBackground ? setBackground(styles.bottombar_bg) : setBackground("");
      }
    };

    handleBackground();
    window.addEventListener("resize", handleBackground);

    return () => {
      window.removeEventListener("resize", handleBackground);
    };
  }, [hasBackground]);

  return (
    <section
      id="bottombar"
      className={`position-relative ${background} text-white py-3`}
    >
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            lg={4}
            className="d-flex justify-content-center justify-content-lg-start"
          >
            <SocialLinks />
          </Col>

          <Col
            xs={12}
            lg={4}
            className="d-flex justify-content-center mt-2 mt-lg-0"
          >
            <Copyright />
          </Col>

          <Col xs={12} lg={4}></Col>
        </Row>
      </Container>
    </section>
  );
}
