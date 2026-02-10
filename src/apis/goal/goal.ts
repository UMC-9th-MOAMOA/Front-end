import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { GoalPopupsResponse } from "@/types/goal/goal";

export const getGoalPopups = async () => {
  const { data } = await authAPI.get<ApiResponse<GoalPopupsResponse>>(
    "/members/me/goal-popups"
  );

  if (!data.isSuccess) throw new Error(data.message);
  return data.result;
};

export const markGoalPopupShown = async (goalResultId: number) => {
  const { data } = await authAPI.patch<ApiResponse<null>>(
    `/members/me/goal-popups/${goalResultId}/shown`,
    {}
  );

  if (!data.isSuccess) throw new Error(data.message);
  return data.result;
};
