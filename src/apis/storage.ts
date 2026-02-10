const TOKEN_KEY = "accessToken";
const POLICY_AGREED_KEY = "policyAgreed";
const ONBOARDING_COMPLETED_KEY = "onboardingCompleted";

export const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  getPolicyAgreed: (): boolean | null => {
    const value = localStorage.getItem(POLICY_AGREED_KEY);
    if (value === null) return null;
    return value === "true";
  },
  setPolicyAgreed: (agreed: boolean) =>
    localStorage.setItem(POLICY_AGREED_KEY, String(agreed)),
  removePolicyAgreed: () => localStorage.removeItem(POLICY_AGREED_KEY),

  getOnboardingCompleted: (): boolean | null => {
    const value = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
    if (value === null) return null;
    return value === "true";
  },
  setOnboardingCompleted: (completed: boolean) =>
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, String(completed)),
  removeOnboardingCompleted: () =>
    localStorage.removeItem(ONBOARDING_COMPLETED_KEY),
};
