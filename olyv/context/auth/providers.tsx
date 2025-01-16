"use client";

import { useEffect, useMemo, useState } from "react";
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
import useAuth, { authContext } from "./hooks";
import type {
  AuthProps,
  AuthProviderContextValues,
  AuthProviderProps,
  IsAuthorizedProps,
} from "./types";

export default function Auth({ component, groups, children }: AuthProps) {
  switch (component) {
    default:
      return <AuthProvider groups={groups}>{children}</AuthProvider>;

    case "IsAuthorized":
      return <IsAuthorized groups={groups}>{children}</IsAuthorized>;
  }
}

const AuthProvider = ({ children, groups }: AuthProviderProps) => {
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
  const context: AuthProviderContextValues = {
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
};

const IsAuthorized = ({ children, groups }: IsAuthorizedProps) => {
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
};
