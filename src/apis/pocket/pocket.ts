import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { PocketResponse } from "@/types/pocket/pocket";

export const getPocket = async () => {
  const { data } = await authAPI.get<ApiResponse<PocketResponse>>("/pocket");

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
