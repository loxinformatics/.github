"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { privateRoutes } from "../../management/utils";
import type { UserDetails } from "../../widgets/listitems/types";
import { login } from "./server";
import type { _AuthResponse } from "./types";

interface _AuthContext {
  authGroups: _AuthResponse["groups"];
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  privateRoutes: string[];
}

const _authContext = createContext<_AuthContext | undefined>(undefined);

export default function _Auth({
  groups,
  children,
}: {
  groups?: _AuthResponse["groups"];
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserDetails | null>(null);
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
  const context: _AuthContext = {
    // * Ensure that all of these are being not used only within auth, and are auth related (if not move to base).
    // * Each one of these values should be global.
    authGroups,
    user,
    setUser,
    isAuthorized,
    setIsAuthorized,
    privateRoutes,
  };

  return (
    <_authContext.Provider value={context}>{children}</_authContext.Provider>
  );
}

export function use_Auth() {
  const context = useContext(_authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function IsAuthorized({
  groups,
  children,
}: {
  groups: _AuthResponse["groups"];
  children: React.ReactNode;
}) {
  const groupList = groups || [];
  const { authGroups, user, setIsAuthorized, isAuthorized } = use_Auth();

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
