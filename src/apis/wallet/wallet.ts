import { authAPI } from "@/apis/axios";
import type { ApiError, ApiResponse } from "@/types/api/api";
import type { WalletBalanceResult } from "@/types/wallet/wallet";

const toApiError = (code: string, message: string): ApiError => {
  const error = new Error(message) as ApiError;
  error.serverCode = code;
  error.serverMessage = message;
  return error;
};

export const getMyWalletBalance = async () => {
  const { data } = await authAPI.get<ApiResponse<WalletBalanceResult>>(
    "/members/me/wallet"
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};
