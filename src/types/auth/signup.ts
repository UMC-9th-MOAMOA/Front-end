export interface SignupResult {
  token: {
    grantType: "Bearer";
    accessToken: string;
    accessTokenExpiresIn: number;
  };
  policyAgreed: boolean;
  onboardingCompleted: boolean;
}
