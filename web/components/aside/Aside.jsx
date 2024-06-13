"use client";

import styles from "./Aside.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AsideToggle from "./AsideToggle/AsideToggle";
import { useState, useEffect, useRef } from "react";

export default function Aside() {
  const asideRef = useRef(null);
  const rowRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

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
    const rowElement = rowRef.current;
    const asideElement = asideRef.current;
    const mainElement = document.querySelector("#main");
    if (!asideElement || !mainElement) return;

    const adjustMainMargin = () => {
      if (windowWidth >= 1200) {
        asideElement.classList.remove(styles.asideHidden);
        mainElement.classList.remove(styles.mainWhenAsideClose);
        mainElement.classList.add(styles.mainWhenAsideOpen);
      } else {
        asideElement.classList.add(styles.asideHidden);
        mainElement.classList.remove(styles.mainWhenAsideOpen);
        mainElement.classList.add(styles.mainWhenAsideClose);
      }
    };

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
    adjustMainMargin();

    window.addEventListener("resize", adjustContentPosition);
    return () => {
      window.removeEventListener("resize", adjustContentPosition);
    };
  }, [windowWidth]);

  useEffect(() => {
    const asideElement = asideRef.current;
    const mainElement = document.querySelector("#main");
    if (!asideElement || !mainElement) return;

    if (isAsideOpen) {
      asideElement.classList.remove(styles.asideHidden);
      mainElement.classList.remove(styles.mainWhenAsideClose);
      mainElement.classList.add(styles.mainWhenAsideOpen);
    } else {
      asideElement.classList.add(styles.asideHidden);
      mainElement.classList.remove(styles.mainWhenAsideOpen);
      mainElement.classList.add(styles.mainWhenAsideClose);
    }
  }, [isAsideOpen]);

  return (
    <aside
      ref={asideRef}
      id="aside"
      style={{ width: "300px", transition: "margin-left 0.3s" }}
      className="position-fixed top-0 bottom-0 start-0 bg-success"
    >
      <div className="position-relative" style={{ height: "100%" }}>
        <div className="position-absolute top-0 end-0 pe-2">
          <AsideToggle toggleAside={toggleAside} />
        </div>
        <Row ref={rowRef} className="h-100 pt-3 overflow-auto">
          
            <div className="my-5 py-5">ds</div>
            <div className="my-5 py-5">fsdaf</div>
            <div className="my-5 py-5">FEW</div>
            <div className="my-5 py-5">FEW</div>
            <div className="my-5 py-5">FEWAF</div>
            <div className="my-5 py-5">FESD</div>
            <div className="my-5 py-5">EFCEWA</div>
        </Row>
      </div>
    </aside>
  );
}
