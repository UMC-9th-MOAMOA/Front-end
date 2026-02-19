import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/apis/auth/auth";
import { useApiError } from "@/hooks/api/useApiError";

type LogoutHandlers = {
  onSuccess?: () => void;
};

export const useLogout = (handlers?: LogoutHandlers) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear();
      queryClient.clear();
      handlers?.onSuccess?.();
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
