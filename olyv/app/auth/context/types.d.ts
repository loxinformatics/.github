import type { FormResponse } from "../../base/context/types";
import type { User } from "../Users/types";

// actions & utils
export interface AuthData {
  groups?: string[];
}

export interface TokenData {
  accessToken?: string;
  refreshToken?: string;
}

export interface DecodedToken {
  token_type: "access" | "refresh";
  exp: number;
  iat: number;
  jti: string;
  user_id: number | string;
}

// providers
export interface AuthProps {
  component?: "IsAuthorized";
  groups?: AuthData["groups"];
  children: React.ReactNode;
}

export interface AuthProviderProps {
  groups: AuthProps["groups"];
  children: React.ReactNode;
}

export interface AuthProviderContextValues {
  authGroups: string[];
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  authenticate: (username: string, password: string) => Promise<FormResponse & TokenData>;
  login: (tokens?: TokenData) => Promise<User | null>;
  logout: () => Promise<FormResponse>;
  authApiURL: string;
  loginURL: string;
  loginRedirectURL: string;
  logoutURL: string;
  logoutRedirectURL: string;
  privateRoutes: string[];
}

export interface IsAuthorizedProps {
  groups: AuthProps["groups"];
  children: React.ReactNode;
}
