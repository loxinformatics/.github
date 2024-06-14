"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navContext = createContext(null);

export default function NavContext({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [navType, setNavType] = useState("navbar");
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case "/schools":
        setNavType("sidebar");
        break;
      default:
        setNavType("navbar");
        break;
    }
  }, [pathname]);

  const contextData = {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileNavOpen,
    setIsMobileNavOpen,
    navType,
  };

  return (
    <navContext.Provider value={contextData}>{children}</navContext.Provider>
  );
}

export function useNavContext() {
  return useContext(navContext);
}
