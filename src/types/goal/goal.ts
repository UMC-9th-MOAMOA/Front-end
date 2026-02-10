export type GoalType = "DAILY" | "WEEKLY";
export type GoalStatus = "SUCCESS" | "FAIL";

export interface GoalPopup {
  goalResultId: number;
  goalType: GoalType;
  goalDate: string;
  targetCount: number;
  achievedCount: number;
  status: GoalStatus;
}

export interface GoalPopupsResponse {
  popups: GoalPopup[];
}
