import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { MissionApiResponse } from "@/types/mission/mission";

export const getRecommendedMissions = async (
  time: number | null,
  isRefresh: boolean = false
) => {
  const params: Record<string, unknown> = { isRefresh };
  if (time !== null) {
    params.time = time;
  }

  const { data } = await authAPI.get<ApiResponse<MissionApiResponse[]>>(
    "/missions/recommend",
    { params }
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
