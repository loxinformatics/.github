"use client";

import { createContext, useContext, useState } from "react";
import { createNavLinks, toggleAside } from "./config";
import navLinksMap from "./navigation";
import type { CoreContextValues, CoreProps } from "./types";
import AsideToggler from "./widgets/AsideToggler";
import Nav from "./widgets/Nav";

export const coreContext = createContext<CoreContextValues | undefined>(
  undefined
);

export default function Core({ children }: CoreProps) {
  const [asideExists, setAsideExists] = useState<boolean>(false);

  // Context
  const context: CoreContextValues = {
    // * Ensure that all of these are being used only within core.
    // * If not, move to base or auth (if auth related).
    asideExists,
    setAsideExists,
    toggleAside,
    AsideToggler,
    createNavLinks,
    navLinksMap,
    Nav,
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
