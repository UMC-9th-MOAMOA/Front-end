import type { ApiResponse } from "@/types/api/api";
import type { Interest, InterestDetail } from "@/types/interest/interest";
import { authAPI } from "../axios";

export const getInterests = async () => {
  const { data } = await authAPI.get<ApiResponse<Interest[]>>("/interests");

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const getInterestDetails = async (interestId: number) => {
  const { data } = await authAPI.get<ApiResponse<InterestDetail[]>>(
    `/interests/${interestId}/details`
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
