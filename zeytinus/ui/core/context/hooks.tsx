"use client";

import { createContext, useContext } from "react";
import type { CoreContextValues } from "./types";

export const coreContext = createContext<CoreContextValues | undefined>(undefined);

export default function useCore() {
  const context = useContext(coreContext);
  if (context === undefined) {
    throw new Error("useCore must be used within a CoreProvider");
  }
  return context;
}
