"use client";

// * unlike the scroll_to core util which depends on the header and is only used within Core,
// * this doesn't have any dependencies and can be used globally. Therefore, it is a Base component.

import { useEffect, useState } from "react";
import { useBase } from "../context";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { Btn } = useBase();

  // Scroll Function
  const scroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Set Button Visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Btn
      id="scroll-top"
      className={`fixed end-4 bottom-4 z-30 w-10 h-10
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
      `}
      onClick={scroll}
    >
      <i className="bi bi-arrow-up-short text-2xl"></i>
    </Btn>
  );
}
