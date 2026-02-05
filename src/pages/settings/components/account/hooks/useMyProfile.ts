import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMyProfile, updateMyProfile } from "@/apis/profile/profile";
import { useApiError } from "@/hooks/api/useApiError";
import type { UpdateMyProfileRequest } from "@/types/profile/profile";

export const myProfileQueryKey = ["members", "me", "profile"] as const;

export const useMyProfile = () => {
  const { handleError } = useApiError();

  return useSuspenseQuery({
    queryKey: myProfileQueryKey,
    queryFn: getMyProfile,
    onError: (error) => handleError(error),
  });
};

export const useUpdateMyProfile = () => {
  const qc = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (payload: UpdateMyProfileRequest) => updateMyProfile(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: myProfileQueryKey });
    },
    onError: (error) => handleError(error),
  });
};
