import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";

import type {
  MyProfile,
  UpdateMyProfileRequest,
  UpdateMyProfileResult,
} from "@/types/profile/profile";
import { toApiError } from "@/utils/apiError";

export const getMyProfile = async () => {
  const { data } = await authAPI.get<ApiResponse<MyProfile>>(
    "/members/me"
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};

export const updateMyProfile = async (payload: UpdateMyProfileRequest) => {
  const { data } = await authAPI.put<ApiResponse<UpdateMyProfileResult>>(
    "/members/me",
    payload
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};

export const deleteMember = async () => {
  const { data } = await authAPI.delete<ApiResponse<null>>("/members/me");

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};
