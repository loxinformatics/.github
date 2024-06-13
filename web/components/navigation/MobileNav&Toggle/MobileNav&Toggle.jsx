"use client";

import styles from "./MobileNav&Toggle.module.css";
import { BsX, BsList } from "react-icons/bs";
import Navigation from "@/components/navigation/navigation";
import { useNavigationContext } from "@/components/navigation/context";

export default function MobileNav() {
  const { isMobileNavOpen, toggleMobileNav } = useNavigationContext();

  return (
    <nav
      id="navbar-mobile"
      className={` ${
        isMobileNavOpen &&
        `${styles.navbarMobile} position-fixed overflow-hidden top-0 end-0 bottom-0 start-0`
      }`}
    >
      <ul className={`${styles.ul} ${isMobileNavOpen ? "d-block" : "d-none"}`}>
        <Navigation isMobileNav={true} />
      </ul>
      <div
        className={` ${styles.toggle} ${
          isMobileNavOpen && styles.toggleWhenMobileNavIsOpen
        }`}
        onClick={() => {
          toggleMobileNav();
        }}
      >
        {isMobileNavOpen ? <BsX /> : <BsList />}
      </div>
    </nav>
  );
}
