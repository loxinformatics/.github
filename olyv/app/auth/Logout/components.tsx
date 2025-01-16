"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import Preloader from "../../base/Preloader/components";

export default function LogoutSection() {
  const { loginURL, logoutRedirectURL, setUser, setIsAuthorized, logout } =
    useAuth();
  const SignoutInner = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const encodedHrefParam = searchParams.get("callbackUrl");
    const nextUrl =
      logoutRedirectURL === loginURL && encodedHrefParam
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
