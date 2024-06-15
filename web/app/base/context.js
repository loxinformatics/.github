"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { APIUrl } from "@/app/context";
import Preloader from "@/components/widgets/Preloader/Preloader";

const baseContext = createContext(null);

export default function BaseContext({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [base, setBase] = useState(null);

  // Fetches base data from the API and sets it in the state.
  useEffect(() => {
    const fetchBase = async () => {
      try {
        const response = await fetch(APIUrl + "/base/info/");
        const data = await response.json();
        setBase(data[0]);
      } catch (e) {
        setError(`Base Provider Error: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBase();
    return () => {};
  }, []);

  const contextData = {
    base: base,
  };

  return (
    <baseContext.Provider value={contextData}>
      {loading ? (
        <Preloader />
      ) : error ? (
        <>
          {console.error(error)}
          {children}
        </>
      ) : (
        children
      )}
    </baseContext.Provider>
  );
}

// Custom hook to use the Base context
export function useBaseContext() {
  return useContext(baseContext);
}
