import { useMutation } from "@tanstack/react-query";
import { deleteMember } from "@/apis/profile/profile";
import { useApiError } from "@/hooks/api/useApiError";
import { useAuthStore } from "@/store/auth";

type WithdrawHandlers = {
  onSuccess?: () => void;
};

export const useWithdraw = (handlers?: WithdrawHandlers) => {
  const { handleError } = useApiError();
  const setPolicyAgreed = useAuthStore((state) => state.setPolicyAgreed);

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      localStorage.clear();
      setPolicyAgreed(null);
      handlers?.onSuccess?.();
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
