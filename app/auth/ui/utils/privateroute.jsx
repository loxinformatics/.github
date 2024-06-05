"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthcontext } from "@/app/auth/context";
import Preloader from "@/app/ui/preloader/preloader";


export default function PrivateRoute({ children }) {
    const { user } = useAuthcontext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
        }
    }, [router, user, pathname]);

    if (!user) return <Preloader />;

    return children;
}