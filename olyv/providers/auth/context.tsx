"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../../app/auth/Users/types";
import { authenticate, login, logout } from "./actions";
import {
  authApiURL,
  loginRedirectURL,
  loginURL,
  logoutRedirectURL,
  logoutURL,
  privateRoutes,
} from "./config";
import type { AuthContextValues, AuthProps } from "./types";
import IsAuthorized from "./widgets/IsAuthorized";

const authContext = createContext<AuthContextValues | undefined>(undefined);

export default function Auth({ component, groups, children }: AuthProps) {
  switch (component) {
    default:
      const [user, setUser] = useState<User | null>(null);
      const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
      const authGroups = groups || [];

      // Initializations
      useEffect(() => {
        const initAuth = async () => {
          try {
            const userData = await login();
            setUser(userData);
          } catch (error) {
            console.error("Failed to login:", error);
          }
        };

        initAuth();
      }, []);

      // Context
      const context: AuthContextValues = {
        // * Ensure that all of these are being not used only within auth, and are auth related (if not move to base).
        // * Each one of these values should be global.
        authGroups,
        user,
        setUser,
        isAuthorized,
        setIsAuthorized,
        authenticate,
        login,
        logout,
        authApiURL,
        loginURL,
        loginRedirectURL,
        logoutURL,
        logoutRedirectURL,
        privateRoutes,
      };

      return (
        <authContext.Provider value={context}>{children}</authContext.Provider>
      );

    case "IsAuthorized":
      return <IsAuthorized groups={groups}>{children}</IsAuthorized>;
  }
}

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
