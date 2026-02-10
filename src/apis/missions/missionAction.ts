import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type {
  MissionDetailResponse,
  MissionStatusRequest,
  StatusChangeResponse,
  SubmitQuizRequest,
  SubmitQuizResponse,
  WatchMissionResponse,
} from "@/types/mission/mission";

export const getMissionDetail = async (missionId: number) => {
  const { data } = await authAPI.get<ApiResponse<MissionDetailResponse>>(
    `/missions/${missionId}`
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const watchMission = async (missionId: number) => {
  const { data } = await authAPI.post<ApiResponse<WatchMissionResponse>>(
    `/missions/${missionId}/watch`
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const changeMissionStatus = async (
  missionId: number,
  status: MissionStatusRequest
) => {
  const { data } = await authAPI.patch<ApiResponse<StatusChangeResponse>>(
    `/missions/${missionId}/status`,
    { status }
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const submitMissionQuiz = async (
  missionId: number,
  submissions: SubmitQuizRequest
) => {
  const { data } = await authAPI.post<ApiResponse<SubmitQuizResponse>>(
    `/missions/${missionId}/submit`,
    submissions
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
