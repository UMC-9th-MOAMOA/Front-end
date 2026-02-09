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

export const dismissPopup = async (settingKey: string) => {
  const { data } = await authAPI.post<ApiResponse<null>>(
    "/members/me/dismissed-popups",
    { settingKey }
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
