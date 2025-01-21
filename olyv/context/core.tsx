"use client";

import { createContext, useContext, useState } from "react";
import type { CoreContext, CoreProps } from "../types/core";
import { createNavLinks } from "../utils/core";
import { ScrollTop } from "../widgets/core";
import navLinksMap from "./navigation";

const Core = createContext<CoreContext | undefined>(undefined);

export function CoreProvider({ children }: CoreProps) {
  const [asideExists, setAsideExists] = useState<boolean>(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);

  // Context
  const context: CoreContext = {
    // * Ensure that all of these are being used only within core.
    // * If not, move to base or auth (if auth related).
    asideExists,
    setAsideExists,
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
