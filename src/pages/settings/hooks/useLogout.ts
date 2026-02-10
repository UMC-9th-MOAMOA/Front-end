import { useMutation } from "@tanstack/react-query";
import { logout } from "@/apis/auth/auth";
import { useApiError } from "@/hooks/api/useApiError";
import { useAuthStore } from "@/store/auth";

type LogoutHandlers = {
  onSuccess?: () => void;
};

export const useLogout = (handlers?: LogoutHandlers) => {
  const { handleError } = useApiError();
  const setPolicyAgreed = useAuthStore((state) => state.setPolicyAgreed);

  return useMutation({
    mutationFn: logout,
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
