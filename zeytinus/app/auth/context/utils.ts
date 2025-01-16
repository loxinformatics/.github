import { jwtDecode } from "jwt-decode";
import { apiURL, homeURL } from "../../base/context/utils";
import type { DecodedToken } from "./types";

export const authApiURL = `${apiURL}/auth`;
export const loginURL = process.env.NEXT_PUBLIC_LOGIN_URL || "/auth/login";
export const loginRedirectURL = process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL || homeURL;
export const logoutURL = process.env.NEXT_PUBLIC_LOGOUT_URL || "/auth/logout";
export const logoutRedirectURL = process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URL || loginURL || homeURL;

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

export async function refreshAccessToken(
  refreshToken: string,
): Promise<{ newAccessToken: string; newRefreshToken: string }> {
  // TODO: Have this use the 'Fetch' util
  try {
    const response = await fetch(`${authApiURL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    const { access, refresh } = data;
    return { newAccessToken: access, newRefreshToken: refresh };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh token");
  }
}
