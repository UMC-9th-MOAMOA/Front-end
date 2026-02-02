import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { MissionsPageResponse } from "@/types/mission/mission";

interface GetCategoryMissionsParams {
  categoryId: number;
  subcategoryId?: number;
  page?: number;
  size?: number;
  seed?: number;
}

export const getCategoryMissions = async ({
  categoryId,
  subcategoryId,
  page = 0,
  size = 3,
  seed = Date.now(),
}: GetCategoryMissionsParams) => {
  const params: Record<string, number> = { categoryId, page, size, seed };
  if (subcategoryId !== undefined) {
    params.subcategoryId = subcategoryId;
  }

  const { data } = await authAPI.get<ApiResponse<MissionsPageResponse>>(
    "/missions/categories",
    {
      params,
    }
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
