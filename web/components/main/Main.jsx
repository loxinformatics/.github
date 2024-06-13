"use client";

import styles from "./Main.module.css";
import React, { useEffect, useState } from "react";

export default function Main({ children, fixAndCenter = false, background }) {
  const [height, setHeight] = useState("100%");

  // adjust the height if header and/or bottom bar is present
  useEffect(() => {
    const adjustHeight = () => {
      const header = document.querySelector("#header");
      const bottombar = document.querySelector("#bottombar");

      const mainHeight = fixAndCenter ? "100vh" : "100%";
      const headerHeight = fixAndCenter && header ? header.offsetHeight : 0;
      const bottombarHeight =
        fixAndCenter && bottombar ? bottombar.offsetHeight : 0;
      const totalHeight = `calc(${mainHeight} - ${headerHeight}px - ${bottombarHeight}px)`;

      setHeight(totalHeight);
    };

    adjustHeight();

    const observer = new MutationObserver(adjustHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("resize", adjustHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", adjustHeight);
    };
  }, [fixAndCenter]);

  // Set the background if provided
  useEffect(() => {
    const adjustBackground = () => {
      if (background) document.body.classList.add(background);
    };

    adjustBackground();

    return () => {
      if (background) {
        document.body.classList.remove(background);
      }
    };
  }, [background]);

  return (
    <main
      id="main"
      style={{ height: height }}
      className={`position-relative ${
        fixAndCenter ? "d-flex flex-column flex-grow-1" : ""
      } `}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          sectionInMain: `sectionInMain ${styles.transition} ${
            fixAndCenter ? styles.centeredSection : styles.section
          }`,
        })
      )}
    </main>
  );
}
