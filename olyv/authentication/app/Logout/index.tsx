"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { Preloader } from "../../../base/widgets/spinners";
import olyvConfig from "../../../config";
import { useAuth } from "../Auth";
import { logout } from "../Auth/server";

export default function Logout() {
  const SignoutInner = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setUser, setIsAuthorized } = useAuth();

    const logoutRedirect = olyvConfig.endpoints.logoutRedirect;
    const loginUrl = olyvConfig.endpoints.login;

    const encodedHrefParam = searchParams.get("callbackUrl");
    const nextUrl =
      logoutRedirect === loginUrl && encodedHrefParam
        ? `${logoutRedirect}/?nextUrl=${encodedHrefParam}`
        : logoutRedirect;

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
