"use client";

import { useEffect, useMemo } from "react";
import { useAuth } from "../..";
import type { IsAuthorizedProps } from "../../types";

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

export default IsAuthorized;
