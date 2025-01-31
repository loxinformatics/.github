"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type {
  AuthContext,
  AuthProps,
  IsAuthorizedProps,
  User,
} from "../../types";
import {
  loginRedirectURL,
  logoutRedirectURL,
  privateRoutes,
} from "../../utils";
import { login } from "./server";

const authContext = createContext<AuthContext | undefined>(undefined);

export default function Auth({ groups, children }: AuthProps) {
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
  const context: AuthContext = {
    // * Ensure that all of these are being not used only within auth, and are auth related (if not move to base).
    // * Each one of these values should be global.
    authGroups,
    user,
    setUser,
    isAuthorized,
    setIsAuthorized,
    loginRedirectURL,
    logoutRedirectURL,
    privateRoutes,
  };

  return <authContext.Provider value={context}>{children}</authContext.Provider>;
}

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function IsAuthorized({ groups, children }: IsAuthorizedProps) {
  const groupList = groups || [];
  const { authGroups, user, setIsAuthorized, isAuthorized } = useAuth();

  // Validate groups and throw an error if invalid groups are passed (only if authGroups is not empty)
  useEffect(() => {
    if (authGroups && authGroups.length > 0) {
      const invalidGroups = groupList.filter(
        (group) => !authGroups?.includes(group)
      );
      if (invalidGroups.length > 0) {
        throw new Error(
          `Invalid groups passed to <Auth>: ${invalidGroups.join(
            ", "
          )}. Allowed groups: ${authGroups?.join(", ")}`
        );
      }
    }
  }, [groupList, authGroups]);

  // Filter groups to only allow valid authGroups
  const validGroups = useMemo(() => {
    return authGroups && authGroups.length > 0
      ? groupList.filter((group) => authGroups?.includes(group))
      : groupList;
  }, [groupList, authGroups]);

  // Pre-calculate if the user is authorized based on valid groups
  const userIsAuthorized = useMemo(() => {
    if (!user) return false;
    return validGroups.some((group) => user.groups.includes(group));
  }, [user, validGroups]);

  useEffect(() => {
    // Update authorization status only if it changes
    if (userIsAuthorized !== isAuthorized) {
      setIsAuthorized(userIsAuthorized);
    }
  }, [userIsAuthorized, isAuthorized, setIsAuthorized]);

  return isAuthorized ? <>{children}</> : null;
}
