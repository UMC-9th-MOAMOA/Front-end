import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { KeywordsResponse } from "@/types/keyword/keyword";

export const getKeywords = async () => {
  const { data } =
    await authAPI.get<ApiResponse<KeywordsResponse>>("/missions/keywords");

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
