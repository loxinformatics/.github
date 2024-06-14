"use client";

import styles from "./Main.module.css";
import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import Sidebar from "@/components/main/Sidebar&Toggle/Sidebar&Toggle";
import { useNavContext } from "../shared/Navigation/context";

export default function Main({ children, fixAndCenter = false, background }) {
  const mainRef = useRef(null);
  const [height, setHeight] = useState("100%");
  const { navType } = useNavContext();

  // adjust the height if header and/or bottom bar is present
  useLayoutEffect(() => {
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
      ref={mainRef}
      id="main"
      style={{ height: height }}
      className={`${
        fixAndCenter ? "d-flex flex-column flex-grow-1" : ""
      } `}
    >
      {navType === "sidebar" && <Sidebar />}

      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          sectionInMain: `sectionInMain ${
            fixAndCenter ? styles.centeredSection : styles.section
          }`,
        })
      )}
    </main>
  );
}
