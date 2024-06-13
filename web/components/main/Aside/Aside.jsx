"use client";

import styles from "./Aside.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AsideToggle from "../../shared/AsideToggle/AsideToggle";
import { useAsideToggleContext } from "../../shared/AsideToggle/context";
import { useState, useEffect, useRef } from "react";

export default function Aside() {
  const asideRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isAsideOpen, setIsAsideOpen } = useAsideToggleContext();

  // Monitor Changes in Window Size
  useEffect(() => {
    windowWidth >= 1200 ? setIsAsideOpen(true) : setIsAsideOpen(false);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsAsideOpen, windowWidth]);

  // Open or Close Sidebar (IsAsideOpen state determined by Aside Toggle or changes in Window Size)
  useEffect(() => {
    const asideElement = asideRef.current;
    const sectionElements = document.querySelectorAll("section.sectionInMain");
    if (!asideElement && sectionElements.length === 0) {
      return;
    } else {
      // Add transition
      sectionElements.forEach((element) => {
        element.style.transition = asideElement.style.transition;
      });
    }

    asideElement.style.marginLeft = isAsideOpen
      ? "0px"
      : `-${asideElement.offsetWidth}px`;
    if (isAsideOpen) {
      sectionElements.forEach((element) => {
        element.classList.add(styles.whenAsideOpen);
        element.classList.remove(styles.whenAsideClose);
      });
    } else {
      sectionElements.forEach((element) => {
        element.classList.remove(styles.whenAsideOpen);
        element.classList.add(styles.whenAsideClose);
      });
    }
  }, [isAsideOpen]);

  return (
    <aside
      ref={asideRef}
      id="aside"
      style={{ width: "300px", transition: "margin-left 0.3s" }}
      className={`position-absolute top-0 bottom-0 start-0 bg-success overflow-y-auto overflow-x-hidden`}
    >
      <div className="position-fixed z-2" style={{ left: `20px`, top: "8px" }}>
        <AsideToggle />
      </div>

      <Container>
        <div className="my-5 py-5"></div>
        <div className="my-5 py-5"></div>
        <div className="my-5 py-5"></div>
        <div className="my-5 py-5"></div>
        <div className="my-5 py-5"></div>
        <div className="my-5 py-5"></div>
      </Container>
    </aside>
  );
}
