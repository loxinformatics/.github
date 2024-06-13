"use client";

import styles from "./Navbar.module.css";
import Navigation from "@/components/navigation/navigation";

export default function Navbar() {
  return (
    <nav id="navbar" className={`navbar p-0`}>
      <ul className={`p-0 m-0 d-flex list-unstyled align-items-center`}>
        <Navigation />
      </ul>
    </nav>
  );
}
