"use client";

import styles from "./Navbar.module.css";
import NavLinks from "@/components/shared/Navigation/NavLinks";

export default function Navbar() {
  return (
    <nav id="navbar" className={`navbar p-0`}>
      <ul className={`p-0 m-0 d-flex list-unstyled align-items-center`}>
        <NavLinks inNavbar={true} />
      </ul>
    </nav>
  );
}
