import { jwtDecode } from "jwt-decode";
import { apiURL, homeURL } from "../base/utils";
import type { DecodedToken } from "./types";

export const authApiURL = `${apiURL}/auth`;
export const loginURL = process.env.NEXT_PUBLIC_LOGIN_URL || "/auth/login";
export const loginRedirectURL =
  process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL || homeURL;
export const logoutURL = process.env.NEXT_PUBLIC_LOGOUT_URL || "/auth/logout";
export const logoutRedirectURL =
  process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URL || loginURL || homeURL;

export const privateRoutes = process.env.NEXT_PUBLIC_PRIVATE_ROUTES
  ? JSON.parse(process.env.NEXT_PUBLIC_PRIVATE_ROUTES)
  : [];

export const publicRoutes = process.env.NEXT_PUBLIC_PUBLIC_ROUTES
  ? JSON.parse(process.env.NEXT_PUBLIC_PUBLIC_ROUTES)
  : [];

export function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return Date.now() >= decodedToken.exp * 1000;
  } catch {
    return true;
  }
}
