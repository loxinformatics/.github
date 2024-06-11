"use client";

import styles from "./Aside.module.css";

export default function Aside({ children }) {
  return (
    <aside
      id="aside"
      className={`${styles.aside} position-fixed bg-success z-1`}
    >
      {children}
    </aside>
  );
}

export function AsideToggle() {
  const toggleSidebar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  return (
    <div>
      <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
    </div>
  );
}
