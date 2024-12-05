"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./ForwardButton.module.css";

const version = process.env.NEXT_PUBLIC_FORWARD_BUTTON_VERSION || "V1";

const forwardBtnLinks = [
  { path: "/", name: "Get Started", href: "/#about" },
  { path: "/auth", name: "Dashboard", href: "/dashboard" },
];

export default function ForwardButton() {
  const pathname = usePathname();

  // Find the correct link based on exact match or startsWith match
  const link = forwardBtnLinks.find((link) => {
    if (link.path === "/") {
      return pathname === link.path;
    }
    return pathname.startsWith(link.path);
  });

  if (!link) return null; // If no matching link is found, you can handle it accordingly

  return (
    <Link
      id="forwardBtn"
      className={`text-white rounded ${style[`${version}_forwardBtn`]}`}
      href={link.href}
    >
      {link.name}
    </Link>
  );
}
