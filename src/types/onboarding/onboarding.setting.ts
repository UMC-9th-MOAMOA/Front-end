import type { OnboardingSelection } from "@/types/onboarding/onboarding";

export type SettingOnboardingScope = "INTERESTS";

export type SettingOnboardingResponse = {
  selections: OnboardingSelection[];
};

export type SettingOnboardingRequest = {
  selections: OnboardingSelection[];
};
