"use client";

import { useEffect, useState } from "react";
import style from "./ThemeToggler.module.css";

const version = process.env.NEXT_PUBLIC_THEME_TOGGLER_VERSION || "V1";

export default function ThemeToggler() {
  const [isDarkMode, setIsDarkMode] = useState(null);

  // Set initial theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    }
  }, []);

  // Set theme
  useEffect(() => {
    if (isDarkMode !== null) {
      const theme = isDarkMode ? "dark" : "light";
      document.body.setAttribute("data-bs-theme", theme);
      localStorage.setItem("theme", theme); // Save theme preference to localStorage
    }
  }, [isDarkMode]);

  // Return null on initial render until state is set to avoid mismatch
  if (isDarkMode === null) return null;

  return (
    <button
      id="themeTogglerBtn"
      className={`${style[`${version}_themeTogglerBtn`]} btn position-relative`}
      onClick={() => setIsDarkMode(!isDarkMode)}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <i
          className={`bi bi-sun-fill ${
            style[`themeTogglerIcon`]
          } position-absolute start-50 top-50 translate-middle`}
        ></i>
      ) : (
        <i
          className={`bi bi-moon-fill ${
            style[`themeTogglerIcon`]
          } position-absolute start-50 top-50 translate-middle`}
        ></i>
      )}
    </button>
  );
}
