import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { HomeResult } from "@/types/home/home";

export const getHome = async () => {
  const { data } = await authAPI.get<ApiResponse<HomeResult>>("/home");

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
