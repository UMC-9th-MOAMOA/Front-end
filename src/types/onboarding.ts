export type OnboardingPayload = {
  selections: { interestId: number; subInterestIds: number[] }[];
  dailyMissionGoal?: number | null;
  goalRetention?: "ONE_WEEK" | "TWO_WEEKS" | "ONE_MONTH" | null;
};
