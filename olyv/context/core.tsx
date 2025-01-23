"use client";

import { createContext, useContext, useState } from "react";
import coreStyles from "../styles/core.module.css";
import type { CoreContext, CoreProps, ToggleAsideAction } from "../types/core";
import { createNavLinks } from "../utils/core";
import ScrollTop from "../widgets/base/ScrollTop";
import navLinksMap from "./navigation";

const Core = createContext<CoreContext | undefined>(undefined);

export function CoreProvider({ children }: CoreProps) {
  const [asideExists, setAsideExists] = useState<boolean>(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);

  const toggleAside = (action: ToggleAsideAction = "toggle") => {
    const mediaQuery = window.matchMedia("(max-width: 1199.98px)");

    switch (action) {
      case "closeOnMobile":
        // * will only toggle aside on mobile devices
        if (
          mediaQuery.matches &&
          document.body.classList.contains(coreStyles.toggle_aside)
        ) {
          document.body.classList.remove(coreStyles.toggle_aside);
        }
        break;

      case "toggle":
      default:
        document.body.classList.toggle(coreStyles.toggle_aside);
        break;
    }
  };

  // Context
  const context: CoreContext = {
    // * Ensure that all of these are being used only within core.
    // * If not, move to base or auth (if auth related).
    asideExists,
    setAsideExists,
    toggleAside,
    isNavModalOpen,
    setIsNavModalOpen,
    createNavLinks,
    navLinksMap,
  };

  return (
    <Core.Provider value={context}>
      {children}
      <ScrollTop />
    </Core.Provider>
  );
}

export function useCore() {
  const context = useContext(Core);
  if (context === undefined) {
    throw new Error("useCore must be used within a CoreProvider");
  }
  return context;
}
