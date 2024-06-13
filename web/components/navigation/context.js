"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navigationContext = createContext(null);

export default function NavigationContext({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  // Toggle Sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle Mobile Nav Modal function
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const navType = pathname === "/" ? "sidebar" : "navbar";

  const contextData = {
    isSidebarOpen: isSidebarOpen,
    setIsSidebarOpen: setIsSidebarOpen,
    toggleSidebar: toggleSidebar,
    isMobileNavOpen: isMobileNavOpen,
    setIsMobileNavOpen: setIsMobileNavOpen,
    toggleMobileNav: toggleMobileNav,
  };

  useEffect(() => {
    const headerElement = document.querySelector("#header");
    const mainElement = document.querySelector("#main");

    if (navType === "navbar") {
      headerElement && headerElement.classList.add("hasNavbar");
      mainElement && mainElement.classList.remove("hasAside");
    } else if (navType === "sidebar") {
      headerElement && headerElement.classList.remove("hasNavbar");
      mainElement && mainElement.classList.add("hasAside");
    }

    return () => {};
  }, [navType]);

  return (
    <navigationContext.Provider value={contextData}>
      {children}
    </navigationContext.Provider>
  );
}

export function useNavigationContext() {
  return useContext(navigationContext);
}
