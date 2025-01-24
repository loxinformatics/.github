"use client";

import { useBase } from "@/olyv/app/base/context";
import { useEffect, useState } from "react";
import Btn from "./Btn";

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { isNavModalOpen } = useBase();

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
    !isNavModalOpen && (
      <Btn
        id="scroll-top"
        className={`fixed end-4 bottom-4 z-20 w-10 h-10
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
      `}
        onClick={scroll}
      >
        <i className="bi bi-arrow-up-short text-2xl"></i>
      </Btn>
    )
  );
}
