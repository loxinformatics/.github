"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthcontext } from "@/app/auth/context";
import Preloader from "@/app/ui/preloader/preloader";


export default function PublicRoute({ children }) {
    const { user } = useAuthcontext();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (user) {
            const next = searchParams.get("next") || "/";
            router.replace(next);
        }
    }, [router, user, searchParams]);

    if (user) return <Preloader />;

    return children;
}
