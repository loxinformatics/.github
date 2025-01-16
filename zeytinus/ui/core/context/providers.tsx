"use client";

import { useState } from "react";
import { AsideToggle, Nav } from "./components";
import { coreContext } from "./hooks";
import navLinksMap from "./navigation";
import type { CoreContextValues, CoreProps } from "./types";
import { coreApiURL, createNavLinks, scroll_to, toggleAside } from "./utils";

export default function Core({ children }: CoreProps) {
  const [asideExists, setAsideExists] = useState<boolean>(false);

  // Context
  const context: CoreContextValues = {
    // * Ensure that all of these are being used only within core.
    // * If not, move to base or auth (if auth related).
    asideExists,
    setAsideExists,
    toggleAside,
    AsideToggle,
    createNavLinks,
    navLinksMap,
    Nav,
    scroll_to,
    coreApiURL,
  };

  return <coreContext.Provider value={context}>{children}</coreContext.Provider>;
}
