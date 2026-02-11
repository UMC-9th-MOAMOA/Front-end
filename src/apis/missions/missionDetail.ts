import { authAPI } from "@/apis/axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type { MissionDetailResult } from "@/types/mission/missionDetail";

const toApiError = (code: string, message: string): ApiError => {
  const error = new Error(message) as ApiError;
  error.serverCode = code;
  error.serverMessage = message;
  return error;
};

export const getMissionDetail = async (missionId: number) => {
  const { data } = await authAPI.get<ApiResponse<MissionDetailResult>>(
    `/missions/${missionId}`
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};
