import { useMutation } from "@tanstack/react-query";
import { deleteMember } from "@/apis/profile/profile";
import { useApiError } from "@/hooks/api/useApiError";

type WithdrawHandlers = {
  onSuccess?: () => void;
};

export const useWithdraw = (handlers?: WithdrawHandlers) => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      localStorage.clear();
      handlers?.onSuccess?.();
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
