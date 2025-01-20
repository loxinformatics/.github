"use server";

import { jwtDecode } from "jwt-decode";
import type { NextRequest, NextResponse } from "next/server";
import { NextResponse as Response } from "next/server";
import { refresh } from "../providers/auth/actions";
import {
  isTokenExpired,
  loginRedirectURL,
  loginURL,
  privateRoutes,
  publicRoutes,
} from "../providers/auth/config";
import type { DecodedToken } from "../providers/auth/types";
import { homeURL } from "../providers/base/config";

export async function AuthMiddleware(
  request: NextRequest
): Promise<NextResponse | null> {
  const { pathname, searchParams } = request.nextUrl;

  const setCookies = (
    response: NextResponse,
    accessToken: string,
    refreshToken: string
  ): NextResponse => {
    const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
    const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      path: homeURL,
      sameSite: "strict",
      expires: new Date(decodedAccessToken.exp * 1000),
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      path: homeURL,
      sameSite: "strict",
      expires: new Date(decodedRefreshToken.exp * 1000),
    });

    return response;
  };

  const getCookies = async (
    request: NextRequest,
    retries: number,
    delay: number
  ): Promise<{
    accessToken: string | undefined;
    refreshToken: string | undefined;
  }> => {
    for (let i = 0; i < retries; i++) {
      const accessToken = request.cookies.get("accessToken")?.value;
      const refreshToken = request.cookies.get("refreshToken")?.value;

      if (refreshToken) return { accessToken, refreshToken };

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return { accessToken: undefined, refreshToken: undefined };
  };

  const clearCookies = (response: NextResponse): NextResponse => {
    ["accessToken", "refreshToken"].forEach((cookie) =>
      response.cookies.delete(cookie)
    );
    return response;
  };

  const handlePrivateRoute = async (
    request: NextRequest,
    pathname: string,
    callbackUrl: string | undefined,
    accessToken: string | undefined,
    refreshToken: string | undefined
  ): Promise<NextResponse> => {
    if (!accessToken || isTokenExpired(accessToken)) {
      const nextUrl = new URL(loginURL, request.url);
      nextUrl.searchParams.set("nextUrl", pathname);
      callbackUrl && nextUrl.searchParams.set("callbackUrl", callbackUrl);

      if (refreshToken && !isTokenExpired(refreshToken)) {
        try {
          const { newAccessToken, newRefreshToken } = await refresh(
            refreshToken
          );
          return setCookies(Response.next(), newAccessToken, newRefreshToken); // not using redirect url here
        } catch (error) {
          console.error("Failed to refresh access token", error);
          return clearCookies(Response.redirect(nextUrl));
        }
      } else {
        return clearCookies(Response.redirect(nextUrl));
      }
    } else {
      return Response.next();
    }
  };

  const handlePublicRoute = async (
    request: NextRequest,
    accessToken: string | undefined
  ): Promise<NextResponse> => {
    if (accessToken && !isTokenExpired(accessToken)) {
      return Response.redirect(new URL(loginRedirectURL, request.url));
    } else {
      return Response.next();
    }
  };

  const { accessToken, refreshToken } = await getCookies(request, 3, 100);

  const mergedPublicRoutes = Array.from(new Set([loginURL, ...publicRoutes]));

  if (privateRoutes.some((route: string) => pathname.startsWith(route))) {
    const callbackUrl = searchParams.get("callbackUrl") || undefined;
    return handlePrivateRoute(
      request,
      pathname,
      callbackUrl,
      accessToken,
      refreshToken
    );
  }

  if (mergedPublicRoutes.some((route) => pathname.startsWith(route))) {
    return handlePublicRoute(request, accessToken);
  }

  return null;
}
