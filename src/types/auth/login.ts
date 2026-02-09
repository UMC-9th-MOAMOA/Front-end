export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginToken {
  grantType: "Bearer";
  accessToken: string;
  accessTokenExpiresIn: number;
}

export interface LoginResult {
  token: LoginToken;
  onboardingCompleted: boolean;
  policyAgreed: boolean;
}
