"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useBase } from "../../../../context/base";
import type { ThemeTogglerProps } from "./types";

export default function ThemeToggler({ toggleColor }: ThemeTogglerProps) {
  const [icon, setIcon] = useState<"moon" | "sun">("moon");
  const { theme, setTheme } = useTheme();
  const { textColorHover } = useBase();
  const color = toggleColor || "text-color dark:text-color-reverse";

  useEffect(() => {
    setIcon(theme === "dark" ? "sun" : "moon");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      id="themeTogglerBtn"
      className={`bg-transparent border-0 ${color} ${textColorHover}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <i className={`bi bi-${icon}-fill`}></i>
    </button>
  );
}
