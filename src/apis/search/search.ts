import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { MissionsPageResponse } from "@/types/mission/mission";
import type {
  RelatedKeywordsResponse,
  SearchMissionsParams,
} from "@/types/search/search";

export const searchMissions = async ({
  searchText,
  keywords,
  seed,
  page = 0,
  size = 10,
}: SearchMissionsParams) => {
  const { data } = await authAPI.get<ApiResponse<MissionsPageResponse>>(
    "/missions/search",
    {
      params: {
        page,
        size,
        seed,
        searchText: searchText || undefined,
        keywords: keywords?.length ? keywords : undefined,
      },
      paramsSerializer: {
        indexes: null,
      },
    }
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const getRelatedKeywords = async (keyword: string) => {
  const { data } = await authAPI.get<ApiResponse<RelatedKeywordsResponse>>(
    "/missions/keywords/related",
    { params: { keyword } }
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
