import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getSettingOnboarding,
  updateSettingOnboarding,
} from "@/apis/onboarding/settingOnboarding";
import { useApiError } from "@/hooks/api/useApiError";
import type { SettingOnboardingRequest } from "@/types/onboarding/onboarding.setting";

type SelectedMap = Record<number, number[]>;

export const useSettingOnboarding = () => {
  return useSuspenseQuery({
    queryKey: ["settings", "onboarding", "interests"],
    queryFn: getSettingOnboarding,
    select: (data) => {
      const selected: SelectedMap = {};
      data.selections.forEach((selection) => {
        selected[selection.interestId] = selection.subInterestIds;
      });
      return selected;
    },
  });
};

export const useUpdateSettingOnboarding = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SettingOnboardingRequest) =>
      updateSettingOnboarding(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "onboarding", "interests"],
      });
    },
    onError: (error) => handleError(error),
  });
};
