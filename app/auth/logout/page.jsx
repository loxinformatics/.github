"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/auth/context";
import Preloader from "@/app/ui/Preloader/Preloader";

export default function Logout() {
    const { setAuthTokens, setUser } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        // Perform the logout process
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem("authTokens");

        // Redirect to the homepage after logout
        router.replace("/");
    }, [setUser, setAuthTokens, router]);

    // Render Preloader while redirecting
    return <Preloader />;
}
