import { jwtDecode } from "jwt-decode";
import conf from "../../../config";
import type { TokenDetails } from "../../widgets/tokens/types";

export const privateRoutes = (process.env.PRIVATE_ROUTES ?? "")
  .split(",")
  .map((route) => route.trim());
export const publicRoutes = (process.env.PUBLIC_ROUTES ?? "")
  .split(",")
  .map((route) => route.trim());

export function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = jwtDecode<TokenDetails>(token);
    return Date.now() >= decodedToken.exp * 1000;
  } catch {
    return true;
  }
}

export const AuthDjangoUrl = `${conf.django.url}/olyv/_auth`;
