"use client";

import { useAppContext } from "@/app/context";
import { createContext, useContext, useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";

const socialLinksContext = createContext(null);

export default function SocialLinksContext({ children }) {
  const [socialLinks, setSocialLinks] = useState(null);
  const [loading, setLoading] = useState(true);
  const { API_URL } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/social-links/`);

        if (!response.ok) {
          throw new Error("Failed to fetch social links data");
        }

        const data = await response.json();
        setSocialLinks(data[0] || null);
      } catch (e) {
        console.warn("Failed to fetch social links data:", e);
        setSocialLinks(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const contextData = { socialLinks };

  if (loading) return <Preloader />;

  return (
    <socialLinksContext.Provider value={contextData}>
      {children}
    </socialLinksContext.Provider>
  );
}

export function useSocialLinksContext() {
  return useContext(socialLinksContext);
}
