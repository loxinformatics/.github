"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Preloader from "../../widgets/loaders/Preloader";
import { logout } from "../actions";
import { useAuth } from "../context";

export default function LogoutSection() {
  const SignoutInner = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { logoutRedirectURL, setUser, setIsAuthorized } = useAuth();

    const encodedHrefParam = searchParams.get("callbackUrl");
    const nextUrl =
      logoutRedirectURL === "/auth/login" && encodedHrefParam
        ? `${logoutRedirectURL}/?nextUrl=${encodedHrefParam}`
        : logoutRedirectURL;

    useEffect(() => {
      const performlogout = async () => {
        try {
          const response = await logout();
          if (response.success) {
            setIsAuthorized(false);
            setUser(null);
            router.replace(nextUrl);
          } else {
            throw new Error(`Logout failed: ${response.message}`);
          }
        } catch (error) {
          console.error(error);
        }
      };

      performlogout();
    }, []);

    return <Preloader indefinite />;
  };

  return (
    <Suspense fallback={<Preloader />}>
      <SignoutInner />
    </Suspense>
  );
}
