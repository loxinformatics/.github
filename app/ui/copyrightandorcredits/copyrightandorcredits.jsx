"use client";

import styles from "./copyrightandorcredits.module.css";
import { useRootcontext } from "@/app/context";


export default function CopyrightAndOrCredits() {
    const { root } = useRootcontext();

    return (
        root.name && (
            <div className={`${styles.copyright} bg-black text-white text-center pt-4 pb-3`}>
                &copy; Copyright <strong><span>{root.name}</span></strong>. All Rights Reserved
            </div>
        )
    );
}