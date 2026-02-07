import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type {
  MissionStatus,
  MissionStatusResult,
} from "@/types/mission/mission";

export const updateMissionStatus = async (
  missionId: number,
  status: MissionStatus,
) => {
  const { data } = await authAPI.patch<ApiResponse<MissionStatusResult>>(
    `/missions/${missionId}/status`,
    { status },
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
