"use client";

import { createContext, useContext, useState } from "react";
import type { CoreContext, CoreProps } from "../types/core";
import { createNavLinks } from "../utils/core";
import navLinksMap from "./navigation";

export const coreContext = createContext<CoreContext | undefined>(undefined);

export function Core({ children }: CoreProps) {
  const [asideExists, setAsideExists] = useState<boolean>(false);

  // Context
  const context: CoreContext = {
    // * Ensure that all of these are being used only within core.
    // * If not, move to base or auth (if auth related).
    asideExists,
    setAsideExists,
    createNavLinks,
    navLinksMap,
  };

  return (
    <coreContext.Provider value={context}>{children}</coreContext.Provider>
  );
}

export function useCore() {
  const context = useContext(coreContext);
  if (context === undefined) {
    throw new Error("useCore must be used within a CoreProvider");
  }
  return context;
}
