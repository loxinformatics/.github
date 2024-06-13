"use client";

import styles from "./AsideToggle.module.css";
import { BsList } from "react-icons/bs";
import { useAsideToggleContext } from "./context";

export default function AsideToggle() {
  const { isAsideOpen, setIsAsideOpen } = useAsideToggleContext();

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <div
      className={`${styles.toggleAsideBtn}`}
      onClick={() => {
        toggleAside();
      }}
    >
      <BsList className="text-white" />
    </div>
  );
}
