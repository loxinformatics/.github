"use client";

import styles from "./Main.module.css";
import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import Sidebar from "@/components/navigation/Sidebar&Toggle/Sidebar&Toggle";

export default function Main({ children, fixAndCenter = false, background }) {
  const mainRef = useRef(null);
  const [asideNavigation, setAsideNavigation] = useState(null);
  const [height, setHeight] = useState("100%");

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

  // Determine whether to include Aside navigation based on 'hasAside' class
  // *: The 'hasAside' class is toggled by the `NavType` element from `useNavigationContext()`
  useEffect(() => {
    const mainElement = mainRef.current;
    mainElement &&
      mainElement.classList.contains("hasAside") &&
      setAsideNavigation(<Sidebar />);

    return () => {};
  }, []);

  return (
    <main
      ref={mainRef}
      id="main"
      style={{ height: height }}
      className={`position-relative ${
        fixAndCenter ? "d-flex flex-column flex-grow-1" : ""
      } `}
    >
      {asideNavigation}

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
