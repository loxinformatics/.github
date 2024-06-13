"use client";

import styles from "./Sidebar&Toggle.module.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { useNavigationContext } from "@/components/navigation/context";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Navigation from "@/components/navigation/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";

export default function Sidebar() {
  const asideRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [contentTop, setContentTop] = useState(0);
  const { isSidebarOpen, setIsSidebarOpen, toggleSidebar } =
    useNavigationContext();

  // Monitor Changes in Window Size
  useEffect(() => {
    setIsSidebarOpen(windowWidth >= 1200);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsSidebarOpen, windowWidth]);

  // Set top property of content within Aside to start from below header
  useEffect(() => {
    const headerElement = document.querySelector("#header");
    setContentTop(headerElement ? headerElement.offsetHeight : 0);
  }, []);

  // Open or Close Sidebar (IsAsideOpen state determined by Aside Toggle or changes in Window Size)
  useLayoutEffect(() => {
    const asideElement = asideRef.current;
    const sectionElements = document.querySelectorAll("section.sectionInMain");

    if (!asideElement || sectionElements.length === 0) return;

    // Add transition
    sectionElements.forEach((element) => {
      element.style.transition = asideElement.style.transition;
    });

    // Toggle Sidebar
    if (isSidebarOpen) {
      asideElement.classList.add(styles.asideOpen);
      asideElement.classList.remove(styles.asideClose);

      sectionElements.forEach((element) => {
        element.classList.add(styles.mainWhenAsideOpen);
        if (windowWidth >= 1200)
          element.classList.remove(styles.mainWhenAsideClose);
      });
    } else {
      asideElement.classList.add(styles.asideClose);
      asideElement.classList.remove(styles.asideOpen);

      sectionElements.forEach((element) => {
        element.classList.add(styles.mainWhenAsideClose);
        if (windowWidth >= 1200)
          element.classList.remove(styles.mainWhenAsideOpen);
      });
    }
  }, [isSidebarOpen, windowWidth]);

  return (
    <aside
      ref={asideRef}
      id="aside"
      style={{ transition: "margin-left 0.3s ease-in-out" }}
      className={`position-absolute z-1 top-0 bottom-0 start-0 ${styles.aside}`}
    >
      <Container
        className="position-sticky py-1 px-0"
        style={{ top: contentTop }}
      >
        <Col className={`d-flex justify-content-end ${styles.toggleContainer}`}>
          <Button
            className={`${styles.toggleAsideBtn} px-2 me-2`}
            onClick={() => {
              toggleSidebar();
            }}
          >
            {isSidebarOpen ? (
              <FiChevronLeft className={`${styles.toggleIcon}`} />
            ) : (
              <AiOutlineMenu className={styles.toggleIcon} />
            )}
          </Button>
        </Col>

        <Nav className="flex-column">
          <Navigation isSidebar={true} />
        </Nav>
      </Container>
    </aside>
  );
}
