import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { PolicyAgreementsResult } from "@/types/terms/terms";

export interface PolicyAgreementPayload {
  agreements: {
    policyId: number;
    isAgreed: boolean;
  }[];
}

export const submitPolicyAgreements = async (
  payload: PolicyAgreementPayload
) => {
  const { data } = await authAPI.put<ApiResponse<PolicyAgreementsResult>>(
    "/policies/agreements",
    payload
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
