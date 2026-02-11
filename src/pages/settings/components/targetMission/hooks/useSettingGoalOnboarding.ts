import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  getSettingGoalOnboarding,
  updateSettingGoalOnboarding,
} from "@/apis/onboarding/settingGoalOnboarding";
import { useApiError } from "@/hooks/api/useApiError";
import type { SettingGoalOnboardingRequest } from "@/types/onboarding/onboarding.goal.setting";

export const useSettingGoalOnboarding = () => {
  return useSuspenseQuery({
    queryKey: ["settings", "onboarding", "goal"],
    queryFn: getSettingGoalOnboarding,
  });
};

export const useUpdateSettingGoalOnboarding = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SettingGoalOnboardingRequest) =>
      updateSettingGoalOnboarding(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "onboarding", "goal"],
      });
    },
    onError: (error) => handleError(error),
  });
};
