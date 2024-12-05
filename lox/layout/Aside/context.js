"use client";

import { createContext, useContext, useState } from "react";

const asideContext = createContext(null);

export default function AsideContext({ children }) {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const contextData = {
    isAsideOpen,
    setIsAsideOpen,
  };

  return (
    <asideContext.Provider value={contextData}>{children}</asideContext.Provider>
  );
}

export function useAsideContext() {
  return useContext(asideContext);
}
