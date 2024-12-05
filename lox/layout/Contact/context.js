"use client";

import { useAppContext } from "@/app/context";
import { createContext, useContext, useEffect, useState } from "react";
import Preloader from "../../widgets/Preloader/Preloader";

const contactContext = createContext(null);

export default function ContactContext({ children }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const { API_URL } = useAppContext();

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/contact/`);

        if (!response.ok) {
          throw new Error("Failed to fetch Contact data");
        }

        const data = await response.json();

        setContact(data[0] || null);
      } catch (e) {
        console.warn("Failed to fetch Contact data:", e);
        setContact(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const contextData = { contact };

  if (loading) return <Preloader />;

  return (
    <contactContext.Provider value={contextData}>
      {children}
    </contactContext.Provider>
  );
}

export function useContactContext() {
  return useContext(contactContext);
}
