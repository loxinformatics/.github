"use client";

import { useAppContext } from "@/app/context";
import { createContext, useContext, useEffect, useState } from "react";
import Preloader from "../../widgets/Preloader/Preloader";

const usersContext = createContext(null);

export default function UsersContext({ children }) {
  const [users, setUsers] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [standard_users, setStandardUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { API_URL } = useAppContext();

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [usersResponse, administratorsResponse, standardusersResponse] =
          await Promise.all([
            fetch(`${API_URL}/users/list/`),
            fetch(`${API_URL}/users/administrators/`),
            fetch(`${API_URL}/users/standard-users/`),
          ]);

        if (
          !usersResponse.ok ||
          !administratorsResponse.ok ||
          !standardusersResponse.ok
        ) {
          throw new Error("Failed to fetch Users data");
        }

        const usersData = await usersResponse.json();
        const administratorsData = await administratorsResponse.json();
        const standardUsersData = await standardusersResponse.json();

        setUsers(usersData);
        setAdministrators(administratorsData);
        setStandardUsers(standardUsersData);
      } catch (e) {
        console.warn("Failed to fetch users data:", e);
        setUsers([]);
        setAdministrators([]);
        setStandardUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const contextData = { users, administrators, standard_users };

  if (loading) return <Preloader />;

  return (
    <usersContext.Provider value={contextData}>
      {children}
    </usersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(usersContext);
}
