// utils
export interface DecodedToken {
  token_type: "access" | "refresh";
  exp: number;
  iat: number;
  jti: string;
  user_id: number | string;
}

export interface User {
  url: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  groups: string[];
}

// api
export interface AuthReponse {
  groups?: string[];
}

export interface TokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

// app
export interface LoginSignupProps {
  component?: "login" | "signup";
}

// providers
export interface AuthProps {
  groups?: AuthReponse["groups"];
  children: React.ReactNode;
}

export interface AuthContext {
  authGroups: AuthReponse["groups"];
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  loginRedirectURL: string;
  logoutRedirectURL: string;
  privateRoutes: string[];
}

export interface IsAuthorizedProps {
  groups: AuthProps["groups"];
  children: React.ReactNode;
}
