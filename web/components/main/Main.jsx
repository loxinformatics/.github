"use client";

import styles from "./Main.module.css";
import React, { useEffect, useState } from "react";

export default function Main({ children, fixAndCenter = false, background }) {
  const [height, setHeight] = useState("100%");

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
      style={{ height: height, transition: "margin-left 0.3s" }}
      className={`${
        fixAndCenter ? "d-flex flex-column flex-grow-1" : ""
      } position-relative`}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          sectionInMain: `sectionInMain
          ${fixAndCenter ? styles.centeredSection : styles.section}`,
        })
      )}
    </main>
  );
}
