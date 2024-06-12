"use client";

import styles from "./Aside.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect, useRef } from "react";

export default function Aside({ sectionInMain, isAsideOpen }) {
  const asideRef = useRef(null);
  const rowRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(isAsideOpen);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const asideElement = asideRef.current;
    const sections = document.querySelectorAll("section.sectionInMain");
    if (!asideElement || sections.length === 0) return;

    const adjustSectionsMargin = () => {
      if (windowWidth >= 1200) {
        // setIsAsideOpen(true);
        asideElement.classList.remove(styles.asideHidden);
        sections.forEach((section) => {
          section.classList.add(styles.sectionInMain);
        });
      } else {
        asideElement.classList.add(styles.asideHidden);
        sections.forEach((section) => {
          section.classList.remove(styles.sectionInMain);
        });
      }
    };

    const rowElement = rowRef.current;
    const adjustContentPosition = () => {
      let headerHeight = 0;
      let footerHeight = 0;
      let bottombarHeight = 0;

      const header = document.querySelector("#header");
      const footer = document.querySelector("#footer");
      const bottombar = document.querySelector("#bottombar");

      header && (headerHeight = header.offsetHeight);
      footer && (footerHeight = footer.offsetHeight);
      bottombar && (bottombarHeight = bottombar.offsetHeight);

      rowElement.style.marginTop = `${headerHeight}px`;
      rowElement.style.marginBottom = `${footerHeight + bottombarHeight}px`;
    };

    adjustContentPosition();
    adjustSectionsMargin();

    window.addEventListener("resize", adjustContentPosition);
    return () => {
      window.removeEventListener("resize", adjustContentPosition);
    };
  }, [windowWidth]);

  useEffect(() => {
    const asideElement = asideRef.current;
    const sections = document.querySelectorAll("section.sectionInMain");
    if (!asideElement || sections.length === 0) return;

    if (isAsideOpen) {
      asideElement.classList.remove(styles.asideHidden);
      sections.forEach((section) => {
        section.classList.add(styles.sectionInMain);
      });
    } else {
      asideElement.classList.add(styles.asideHidden);
      sections.forEach((section) => {
        section.classList.remove(styles.sectionInMain);
      });
    }
    return () => {};
  }, [isAsideOpen]);

  return (
    <aside
      ref={asideRef}
      id="aside"
      style={{ width: "300px" }}
      className={`${sectionInMain} position-fixed top-0 bottom-0 start-0 bg-success`}
    >
      {/* ${isAsideOpen ? "" : styles.asideHidden} */}
      <Container>
        <Row ref={rowRef}>
          <Col xs={12} className="d-flex justify-content-end">
            <div
              // style={{
              //   position: "absolute",
              //   right: "-50px",
              // }}
            >
              
            </div>
          </Col>

          <Col>{/* Your content here */}</Col>
          
        </Row>
      </Container>
    </aside>
  );
}
