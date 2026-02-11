import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { WalletBalanceResult } from "@/types/wallet/wallet";
import type {
  WalletHistoryParams,
  WalletHistoryResult,
} from "@/types/wallet/walletHistory";
import { toApiError } from "@/utils/apiError";

export const getMyWalletBalance = async () => {
  const { data } = await authAPI.get<ApiResponse<WalletBalanceResult>>(
    "/members/me/wallet"
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};

export const getMyWalletHistory = async (params: WalletHistoryParams) => {
  const { data } = await authAPI.get<ApiResponse<WalletHistoryResult>>(
    "/members/me/wallet/history",
    { params }
  );

  if (!data.isSuccess) {
    throw toApiError(data.code, data.message);
  }

  return data.result;
};
