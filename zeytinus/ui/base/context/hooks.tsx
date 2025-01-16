"use client";

import { createContext, useContext } from "react";
import type { BaseContextValues } from "./types";

export const baseContext = createContext<BaseContextValues | undefined>(undefined);

export default function useBase() {
  const context = useContext(baseContext);
  if (!context) {
    throw new Error("useBase must be used within a BaseProvider");
  }
  return context;
}
