"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loader from "@/app/utils/loader/loader";
import { useAuthContext } from "../../global_context";


export default function PrivateRoute({ children }) {
    const { user } = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
        }
    }, [router, user, pathname]);

    if (!user) return <Loader />;

    return children;
}