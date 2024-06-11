"use client";

import styles from "./Main.module.css";
import React, { useEffect, useState } from "react";

export default function Main({ children, fixAndCenter = false, background }) {
  const [fixedHeight, setFixedHeight] = useState("100vh");

  useEffect(() => {
    const calculateFixedHeight = () => {
      let headerHeight = 0;
      let bottombarHeight = 0;

      const header = document.querySelector("#header");
      const bottombar = document.querySelector("#bottombar");

      if (background) {
        document.body.classList.add(background);
      }

      if (fixAndCenter && header) {
        headerHeight = header.offsetHeight;
      }

      if (fixAndCenter && bottombar) {
        bottombarHeight = bottombar.offsetHeight;
      }

      const totalHeight = `calc(100vh - ${headerHeight}px - ${bottombarHeight}px)`;
      setFixedHeight(totalHeight);
    };

    calculateFixedHeight();

    const observer = new MutationObserver(() => {
      calculateFixedHeight();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", calculateFixedHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateFixedHeight);
      if (background) {
        document.body.classList.remove(background);
      }
    };
  }, [fixAndCenter, background]);

  return (
    <main
      id="main"
      style={{ height: fixAndCenter ? fixedHeight : "100%" }}
      className={`${fixAndCenter ? styles.fixedMain : ""}`}
    >
      {React.Children.map(children, (child) => {
        // Clone each child and pass down the fitInMain className directly or via prop if in a section component.
        return React.cloneElement(child, {
          sectionmain: fixAndCenter ? styles.centeredSection : styles.section,
        });
      })}
    </main>
  );
}
