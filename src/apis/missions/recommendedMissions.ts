import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { MissionApiResponse } from "@/types/mission/mission";

export const getRecommendedMissions = async (time: number | null) => {
  const { data } = await authAPI.get<ApiResponse<MissionApiResponse[]>>(
    "/missions/recommend",
    {
      params: time !== null ? { time } : undefined,
    }
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
