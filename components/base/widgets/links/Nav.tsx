"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/context";
import type { NavLink } from "../../types";
import type { NavLinksProps } from "./types";

export default function Nav({
  links,
  layout,
  renderLink,
  className,
  id,
}: NavLinksProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const handleDropdownClick = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const shouldRenderLink = (link: NavLink) => {
    if (user) {
      if (link.authorized) {
        const isUserOnly =
          link.authorized.length === 1 && link.authorized.includes("USER");
        if (isUserOnly) return true;

        return link.authorized.some(
          (group) => group !== "USER" && user.groups.includes(group)
        );
      }
    }
    return !link.authorized;
  };

  useEffect(() => {
    const initialOpenDropdowns: { [key: string]: boolean } = {};
    links?.forEach((link, index) => {
      if (link.type === "dropdown") {
        link.children?.forEach((child: NavLink) => {
          if (child.href && pathname === child.href) {
            initialOpenDropdowns[index] = true;
          }
        });
      }
    });
    setOpenDropdowns(initialOpenDropdowns);
  }, [links, pathname]);

  return (
    <nav
      id={id}
      className={`${layout === "header" ? "hidden lg:block" : ""} ${className}`}
    >
      <ul className={layout === "header" ? "flex items-center" : ""}>
        {links?.map((link, index) => {
          if (!shouldRenderLink(link)) return null;
          return renderLink(link, index, {
            shouldRenderLink,
            openDropdowns,
            handleDropdownClick,
            pathname,
            user,
          });
        })}
      </ul>
    </nav>
  );
}
