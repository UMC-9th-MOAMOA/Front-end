export type OnboardingSelection = {
  interestId: number;
  subInterestIds: number[];
};

export type OnboardingPayload = {
  selections: OnboardingSelection[];
  dailyMissionTime?: number | null;
  dailyMissionGoal?: number | null;
  goalRetention?: "ONE_WEEK" | "TWO_WEEKS" | "ONE_MONTH" | "CONTINUE" | null;
};

export type OnboardingRequest = {
  selections: OnboardingSelection[];
  dailyMissionGoal: number;
  goalRetention: "ONE_WEEK" | "TWO_WEEKS" | "ONE_MONTH" | "CONTINUE";
};

export type OnboardingApiResponse = {
  selections: OnboardingSelection[];
  dailyMissionGoal: number;
  goalRetention: "ONE_WEEK" | "TWO_WEEKS" | "ONE_MONTH" | "CONTINUE";
  goalEndDate: string;
  pendingDailyMissionGoal: number;
  pendingGoalRetention: "ONE_WEEK" | "TWO_WEEKS" | "ONE_MONTH" | "CONTINUE";
  pendingApplyDate: string;
};
