import { authAPI } from "@/apis/axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type { Interest, InterestDetail } from "@/types/interest/interest";
import type { InterestWithDetails } from "@/types/interest/interest.setting";

function toApiError(code: string, message: string): ApiError {
  const e = new Error(message) as ApiError;
  e.serverCode = code;
  e.serverMessage = message;
  return e;
}

export const getSettingInterests = async () => {
  const { data } = await authAPI.get<ApiResponse<Interest[]>>("/interests");

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};

export const getSettingInterestDetails = async (interestId: number) => {
  const { data } = await authAPI.get<ApiResponse<InterestDetail[]>>(
    `/interests/${interestId}/details`
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};

export const getSettingInterestsWithDetails = async (): Promise<
  InterestWithDetails[]
> => {
  const interests = await getSettingInterests();
  const detailsList = await Promise.all(
    interests.map((interest) => getSettingInterestDetails(interest.id))
  );

  return interests.map((interest, index) => ({
    ...interest,
    details: detailsList[index] ?? [],
  }));
};
