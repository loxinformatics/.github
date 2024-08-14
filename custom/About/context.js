"use client";

import { useAppContext } from "@/app/context";
import Preloader from "@/lox/widgets/Preloader/Preloader";
import { createContext, useContext, useEffect, useState } from "react";

const aboutContext = createContext(null);

export default function AboutContext({ children }) {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { API_URL } = useAppContext();

  // Fetch About Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/about/`);

        if (!response.ok) {
          throw new Error("Failed to fetch About data");
        }

        const data = await response.json();

        setAbout(data[0] || null);
      } catch (e) {
        console.warn("Failed to fetch About data:", e);
        setAbout(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const contextData = { about };

  if (loading) return <Preloader />;

  return (
    <aboutContext.Provider value={contextData}>
      {children}
    </aboutContext.Provider>
  );
}

export function useAboutContext() {
  return useContext(aboutContext);
}
