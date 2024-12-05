"use client";

import { useAppContext } from "@/app/context";
import { createContext, useContext, useEffect, useState } from "react";
import Preloader from "../../widgets/Preloader/Preloader";

const servicesContext = createContext(null);

export default function ServicesContext({ children }) {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const { API_URL } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/services/`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setServices(data ? (Array.isArray(data) ? data : [data]) : null);
      } catch (e) {
        console.warn("Failed to fetch service data:", e);
        setServices(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const contextData = { services };

  if (loading) return <Preloader />;

  return (
    <servicesContext.Provider value={contextData}>
      {children}
    </servicesContext.Provider>
  );
}

export function useServicesContext() {
  return useContext(servicesContext);
}
