import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type {
  SettingGoalOnboardingRequest,
  SettingGoalOnboardingResult,
} from "@/types/onboarding/onboarding.goal.setting";
import { toApiError } from "@/utils/apiError";

const ONBOARDING_ENDPOINT = "/members/me/onboarding";


export const getSettingGoalOnboarding = async () => {
  const { data } = await authAPI.get<ApiResponse<SettingGoalOnboardingResult>>(
    ONBOARDING_ENDPOINT,
    { params: { scope: "GOAL" } }
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};

export const updateSettingGoalOnboarding = async (
  payload: SettingGoalOnboardingRequest
) => {
  const { data } = await authAPI.patch<ApiResponse<SettingGoalOnboardingResult>>(
    ONBOARDING_ENDPOINT,
    payload,
    { params: { scope: "GOAL" } }
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};
