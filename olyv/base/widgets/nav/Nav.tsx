"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { use_Auth } from "../../../_auth/app/_Auth";
import { Link } from "../links";
import {
  DropdownNavLink,
  HeadingNavLink,
  LoginLogoutNavLink,
  LoginNavLink,
  LogoutNavLink,
  PageNavLink,
} from "../links/Navlinks";
import type { NavlinkDetails } from "../links/types";
import type { NavProps } from "./types";

export default function Nav({
  navlinks,
  variant: layout,
  className,
  id,
  navLinkIconClass,
  navLinkClass,
}: NavProps) {
  const pathname = usePathname();
  const { user } = use_Auth();

  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const handleDropdownClick = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const shouldRenderLink = (link: NavlinkDetails) => {
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

  const renderLink = (
    link: NavlinkDetails,
    index: number,
    {
      shouldRenderLink,
      openDropdowns,
      handleDropdownClick,
      pathname,
      user,
    }: any
  ) => {
    switch (layout) {
      case "Navbar":
        return (
          <li key={`navbar-link-${index}`}>
            <Link className={navLinkClass} href={link.href || "#"}>
              {link.icon && (
                <i className={`${link.icon} ${navLinkIconClass}`}></i>
              )}
              {link.text}
            </Link>
          </li>
        );

      case "Sidebar":
        switch (link.type) {
          case "dropdown":
            return (
              <DropdownNavLink
                key={index}
                link={link}
                index={index}
                shouldRenderLink={shouldRenderLink}
                pathname={pathname}
                openDropdowns={openDropdowns}
                handleDropdownClick={handleDropdownClick}
              />
            );
          case "heading":
            return <HeadingNavLink key={index} link={link} />;
          case "login":
            return <LoginNavLink key={index} link={link} pathname={pathname} />;
          case "logout":
            return (
              <LogoutNavLink key={index} link={link} pathname={pathname} />
            );
          case "login/logout":
            return (
              <LoginLogoutNavLink
                key={index}
                user={user}
                link={link}
                pathname={pathname}
              />
            );
          default:
            return <PageNavLink key={index} link={link} pathname={pathname} />;
        }
      case "Navmodal":
        return (
          <li key={`modal-link-${index}`}>
            <Link className={navLinkClass} href={link.href || "#"}>
              {link.icon && (
                <i className={`${link.icon} ${navLinkIconClass}`}></i>
              )}{" "}
              {link.text}
            </Link>
          </li>
        );
    }
  };

  useEffect(() => {
    const initialOpenDropdowns: { [key: string]: boolean } = {};
    navlinks?.forEach((link, index) => {
      if (link.type === "dropdown") {
        link.children?.forEach((child: NavlinkDetails) => {
          if (child.href && pathname === child.href) {
            initialOpenDropdowns[index] = true;
          }
        });
      }
    });
    setOpenDropdowns(initialOpenDropdowns);
  }, [navlinks, pathname]);

  return (
    <nav
      id={id}
      className={`${layout === "Navbar" ? "hidden lg:block" : ""} ${className}`}
    >
      <ul className={layout === "Navbar" ? "flex items-center" : ""}>
        {navlinks?.map((link, index) => {
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
