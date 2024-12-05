"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import style from "./ScrollTopButton.module.css";

const version = process.env.NEXT_PUBLIC_SCROLL_TOP_BUTTON_VERSION || "V1";

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Function
  const scroll = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Set Button Visibility
  useEffect(() => {
    const setButtonVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };
    setButtonVisibility();
    window.addEventListener("scroll", setButtonVisibility);
    return () => {
      window.removeEventListener("scroll", setButtonVisibility);
    };
  }, []);

  return (
    <Button
      id="scroll-top"
      className={`position-fixed d-flex align-items-center justify-content-center ${
        isVisible ? "visible" : "invisible"
      } ${style[`scrolltop`]}`}
      onClick={scroll}
    >
      <i
        className={`bi ${
          version === "V2" ? "bi-chevron-up fs-6" : "bi-arrow-up-short fs-4"
        }  text-white`}
      ></i>
    </Button>
  );
}
