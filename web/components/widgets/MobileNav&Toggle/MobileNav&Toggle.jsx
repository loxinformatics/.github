"use client";

import styles from "./MobileNav&Toggle.module.css";
import { BsX, BsList } from "react-icons/bs";
import NavLinks from "@/components/widgets/NavLinks/NavLinks";
import { useRootContext } from "@/app/context";

export default function MobileNav() {
  const { isMobileNavOpen, setIsMobileNavOpen } = useRootContext();

  // Toggle Mobile Nav Modal function
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav
      id="navbar-mobile"
      className={` ${
        isMobileNavOpen &&
        `${styles.navbarMobile} position-fixed overflow-hidden top-0 end-0 bottom-0 start-0`
      }`}
    >
      <ul className={`${styles.ul} ${isMobileNavOpen ? "d-block" : "d-none"}`}>
        <NavLinks inMobileNav={true} />
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
