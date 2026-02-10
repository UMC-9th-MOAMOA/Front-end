import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markGoalPopupShown } from "@/apis/goal/goal";

export const useMarkGoalPopupShown = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalResultId: number) => markGoalPopupShown(goalResultId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goal", "popups"] });
    },
  });
};
