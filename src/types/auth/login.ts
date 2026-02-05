export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  grantType: "Bearer";
  accessToken: string;
  accessTokenExpiresIn: number;
}
