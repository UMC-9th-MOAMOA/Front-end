import { authAPI } from "@/apis/axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type {
  SettingGoalOnboardingRequest,
  SettingGoalOnboardingResult,
} from "@/types/onboarding/onboarding.goal.setting";

const ONBOARDING_ENDPOINT = "/members/me/onboarding";

function toApiError(code: string, message: string): ApiError {
  const e = new Error(message) as ApiError;
  e.serverCode = code;
  e.serverMessage = message;
  return e;
}

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
