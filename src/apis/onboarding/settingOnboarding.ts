import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type {
  SettingOnboardingRequest,
  SettingOnboardingResponse,
} from "@/types/onboarding/onboarding.setting";
import { toApiError } from "@/utils/apiError";

const ONBOARDING_ENDPOINT = "/members/me/onboarding";


export const getSettingOnboarding = async () => {
  const { data } = await authAPI.get<ApiResponse<SettingOnboardingResponse>>(
    ONBOARDING_ENDPOINT,
    { params: { scope: "INTERESTS" } }
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};

export const updateSettingOnboarding = async (
  payload: SettingOnboardingRequest
) => {
  const { data } = await authAPI.patch<ApiResponse<SettingOnboardingResponse>>(
    ONBOARDING_ENDPOINT,
    payload,
    { params: { scope: "INTERESTS" } }
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};
