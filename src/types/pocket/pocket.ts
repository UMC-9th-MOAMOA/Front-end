export interface GoalProgress {
  dailyGoal: number;
  lastWeekTotalMissionCount: number;
  thisWeekTotalMissionCount: number;
  thisWeekDailyMissionCounts: number[];
}

export interface PocketResponse {
  name: string;
  todayMissionMinutes: number;
  thisWeekMissionMinutes: number;
  walletPoint: number;
  currentStreak: number;
  goalProgress: GoalProgress | null;
}
