export interface TokenDetails {
  token_type: "access" | "refresh";
  exp: number;
  iat: number;
  jti: string;
  user_id: number | string;
}

export interface AuthTokensResponse {
  accessToken?: string;
  refreshToken?: string;
}
