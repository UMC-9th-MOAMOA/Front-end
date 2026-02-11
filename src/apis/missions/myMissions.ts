import { authAPI } from "@/apis/axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type {
  GetMyMissionsParams,
  MyMissionsResponse,
} from "@/types/mission/myMission";

const toApiError = (code: string, message: string): ApiError => {
  const error = new Error(message) as ApiError;
  error.serverCode = code;
  error.serverMessage = message;
  return error;
};

export const getMyMissions = async ({
  status,
  condition,
  categoryId,
  page,
  size,
}: GetMyMissionsParams) => {
  const { data } = await authAPI.get<ApiResponse<MyMissionsResponse>>(
    "/missions/me",
    {
      params: {
        status,
        condition,
        categoryId,
        page,
        size,
      },
    }
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};
