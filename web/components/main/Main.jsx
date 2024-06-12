"use client";

import styles from "./Main.module.css";
import React, { useEffect, useState } from "react";
import AsideToggle from "./AsideToggle/AsideToggle";

export default function Main({ children, fixAndCenter = false, background }) {
  const [height, setHeight] = useState("100%");
  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  useEffect(() => {
    const adjustHeightAndBackground = () => {
      if (background) document.body.classList.add(background);

      const header = document.querySelector("#header");
      const bottombar = document.querySelector("#bottombar");

      const mainHeight = fixAndCenter ? "100vh" : "100%";
      const headerHeight = fixAndCenter && header ? header.offsetHeight : 0;
      const bottombarHeight =
        fixAndCenter && bottombar ? bottombar.offsetHeight : 0;

      const totalHeight = `calc(${mainHeight} - ${headerHeight}px - ${bottombarHeight}px)`;
      setHeight(totalHeight);
    };

    adjustHeightAndBackground();

    const observer = new MutationObserver(adjustHeightAndBackground);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("resize", adjustHeightAndBackground);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", adjustHeightAndBackground);
      if (background) {
        document.body.classList.remove(background);
      }
    };
  }, [fixAndCenter, background]);

  return (
    <main
      id="main"
      style={{ height }}
      className={`${
        fixAndCenter ? "d-flex flex-column flex-grow-1" : ""
      } position-relative`}
    >
      <div
        className="position-fixed"
        style={{
          left: isAsideOpen ? "300px" : "0px",
          transition: "left 0.3s",
        }}
      >
        <AsideToggle toggleAside={toggleAside} />
      </div>

      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          sectionInMain: `sectionInMain ${styles.sectionInMain} ${
            fixAndCenter ? styles.centeredSection : styles.section
          }`,
          isAsideOpen: isAsideOpen,
        })
      )}
    </main>
  );
}
