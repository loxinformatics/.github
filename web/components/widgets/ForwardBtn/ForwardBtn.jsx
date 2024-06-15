"use client";

import Link from "next/link";
import style from "./ForwardBtn.module.css";
import { usePathname } from "next/navigation";
import { useRootContext } from "@/app/context";

export default function ForwardBtn() {
    const { forwardBtnLinks } = useRootContext();
    const pathname = usePathname();

    // Find the correct link based on exact match or startsWith match
    const link = forwardBtnLinks.find(link => {
        if (link.path === "/") {
            return pathname === link.path;
        }
        return pathname.startsWith(link.path);
    });

    if (!link) {
        // If no matching link is found, you can handle it accordingly
        return null;
    }

    return (
        <Link className={style.forwardBtn} href={link.href}>
            {link.name}
        </Link>
    );
}
