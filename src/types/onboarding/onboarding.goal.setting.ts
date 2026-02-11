export type GoalRetentionValue =
  | "CONTINUE"
  | "ONE_WEEK"
  | "TWO_WEEKS"
  | "ONE_MONTH";

export type SettingGoalOnboardingResult = {
  goalEnabled: boolean;
  dailyMissionGoal?: number | null;
  goalRetention?: GoalRetentionValue | null;
  goalEndDate?: string | null;
  pendingDailyMissionGoal?: number | null;
  pendingGoalRetention?: GoalRetentionValue | null;
  pendingApplyDate?: string | null;
};

export type SettingGoalOnboardingRequest = {
  goalEnabled: boolean;
  dailyMissionGoal?: number | null;
  goalRetention?: GoalRetentionValue | null;
};
