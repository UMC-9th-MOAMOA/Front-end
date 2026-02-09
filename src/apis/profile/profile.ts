import { authAPI } from "@/apis/axios";
import type { ApiError, ApiResponse } from "@/types/api/api";

import type {
  MyProfile,
  UpdateMyProfileRequest,
  UpdateMyProfileResult,
} from "@/types/profile";

function toApiError(code: string, message: string): ApiError {
  const e = new Error(message) as ApiError;
  e.serverCode = code;
  e.serverMessage = message;
  return e;
}

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
