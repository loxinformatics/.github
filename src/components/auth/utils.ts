import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "./types";

export const authApiURL = `${process.env.REST_URL}/auth`;
export const loginRedirectURL = process.env.LOGIN_REDIRECT_URL ?? "/";
export const logoutRedirectURL =
  process.env.LOGOUT_REDIRECT_URL ?? "/auth/login";

export const privateRoutes = (process.env.PRIVATE_ROUTES ?? "")
  .split(",")
  .map((route) => route.trim());
export const publicRoutes = (process.env.PUBLIC_ROUTES ?? "")
  .split(",")
  .map((route) => route.trim());

export function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return Date.now() >= decodedToken.exp * 1000;
  } catch {
    return true;
  }
}
