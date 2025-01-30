"use server";

import chalk from "chalk";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { fetchData } from "../base/management/server";
import type { FormResponse } from "../base/management/types";
import type { AuthReponse, DecodedToken, TokenResponse, User } from "./types";
import { authApiURL, isTokenExpired } from "./utils";

export async function fetchAuth(): Promise<AuthReponse> {
  const data = await fetchData<string[]>({
    endpoint: `${authApiURL}/`,
    extra_action: "groups",
    revalidate: 0,
  });

  return { groups: data || null } as AuthReponse;
}

export async function refresh(
  refreshToken: string
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

export async function authenticate(
  username: string,
  password: string
): Promise<FormResponse & TokenResponse> {
  try {
    const response = await fetch(`${authApiURL}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const responseData = await response.json();

    // login successful
    if (response.status === 200 && responseData.access) {
      return {
        success: true,
        message: "Login successful. Redirecting...",
        accessToken: responseData.access,
        refreshToken: responseData.refresh,
      };
    }
    // no username and password provided
    else if (
      response.status === 400 &&
      responseData.username &&
      responseData.password
    ) {
      return {
        success: false,
        message: `These fields may not be blank`,
        error: `username: ${responseData.username[0]}\npassword: ${responseData.password[0]}`,
      };
    }
    // no username provided
    else if (response.status === 400 && responseData.username) {
      return {
        success: false,
        message: responseData.username[0],
        error: `username: ${responseData.username[0]}`,
      };
    }
    // no password provided
    else if (response.status === 400 && responseData.password) {
      return {
        success: false,
        message: responseData.password[0],
        error: `password: ${responseData.password[0]}`,
      };
    }
    // error
    else {
      return {
        success: false,
        message: responseData.detail,
        error: `detail: ${responseData.detail}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      error: "Internal server error",
    };
  }
}

export async function login({
  accessToken,
  refreshToken,
}: TokenResponse = {}): Promise<User | null> {
  const setCookies = async (accessToken: string, refreshToken: string) => {
    const cookieStore = await cookies();
    const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
    const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

    cookieStore.set("accessToken", accessToken, {
      path: "/",
      expires: new Date(decodedAccessToken.exp * 1000),
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "strict",
    });

    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      expires: new Date(decodedRefreshToken.exp * 1000),
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "strict",
    });
  };

  const getCookies = async () => {
    const cookieStore = await cookies();
    return {
      accessToken: cookieStore.get("accessToken")?.value,
      refreshToken: cookieStore.get("refreshToken")?.value,
    };
  };

  try {
    // Set tokens if provided during login
    if (accessToken && refreshToken) {
      await setCookies(accessToken, refreshToken);
    } else {
      // Get tokens from cookies
      const tokens = await getCookies();
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
    }

    // Refresh tokens if not available or expired
    if (!accessToken || isTokenExpired(accessToken)) {
      if (refreshToken && !isTokenExpired(refreshToken)) {
        // Refresh the access token using the refresh token
        const { newAccessToken, newRefreshToken } = await refresh(refreshToken);
        accessToken = newAccessToken;

        // Update cookies with new tokens
        await setCookies(newAccessToken, newRefreshToken);
      } else {
        // If both tokens are invalid or not available, return user as null
        return null;
      }
    }

    // Fetch user
    const userId = jwtDecode<DecodedToken>(accessToken).user_id;
    const userRes = await fetch(`${authApiURL}/users/${userId}/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      throw new Error(
        `Failed to fetch user data: ${userRes.status} ${userRes.statusText}`
      );
    }

    const user = await userRes.json();
    return user;
  } catch (error) {
    console.error(chalk.yellow(error));
    return null;
  }
}

export async function logout(): Promise<FormResponse> {
  const clearCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  };

  try {
    await clearCookies();
    return {
      success: true,
      message: "Logout successful.",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: "Logout failed.",
      error: "Logout failed. Failed to clear cookies.",
    };
  }
}
