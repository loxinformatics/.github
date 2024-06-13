"use client";

import { createContext, useContext, useState } from "react";

const asideToggleContext = createContext(null);

export default function AsideToggleContext({ children }) {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const contextData = {
    isAsideOpen: isAsideOpen,
    setIsAsideOpen: setIsAsideOpen,
  };

  return (
    <asideToggleContext.Provider value={contextData}>
      {children}
    </asideToggleContext.Provider>
  );
}

export function useAsideToggleContext() {
  return useContext(asideToggleContext);
}
