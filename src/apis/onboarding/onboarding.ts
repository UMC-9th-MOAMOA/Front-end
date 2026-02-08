import type { ApiResponse } from "@/types/api/api";
import type {
  OnboardingApiResponse,
  OnboardingRequest,
} from "@/types/onboarding/onboarding";
import { authAPI } from "../axios";

export const updateOnboarding = async (payload: OnboardingRequest) => {
  const { data } = await authAPI.patch<ApiResponse<OnboardingApiResponse>>(
    "/members/me/onboarding",
    payload,
    { params: { scope: "ALL" } }
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
