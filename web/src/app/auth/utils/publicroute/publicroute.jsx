"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Preloader from "@/app/utils/preloader/preloader";
import { useAuthContext } from "../../global_context";


export default function PublicRoute({ children }) {
    const { user } = useAuthContext();
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