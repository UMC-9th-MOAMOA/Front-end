import { useMutation } from "@tanstack/react-query";
import { submitPolicyAgreements } from "@/apis/policy/policy";
import { useApiError } from "@/hooks/api/useApiError";
import type { PolicyAgreementPayload } from "@/apis/policy/policy";

type SubmitPolicyAgreementsHandlers = {
  onSuccess?: () => void;
  onMessage?: (message: string) => void;
};

export const useSubmitPolicyAgreements = (
  handlers?: SubmitPolicyAgreementsHandlers
) => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: PolicyAgreementPayload) =>
      submitPolicyAgreements(payload),
    onSuccess: () => {
      handlers?.onSuccess?.();
    },
    onError: (error) => {
      handleError(error);
      if (error instanceof Error) {
        handlers?.onMessage?.(error.message);
      }
    },
  });
};
