"use client";

import { createContext, useContext } from "react";
import type { AuthProviderContextValues } from "./types";

export const authContext = createContext<AuthProviderContextValues | undefined>(undefined);

export default function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
