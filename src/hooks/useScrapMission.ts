import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMissionStatus } from "@/apis/missions/missions";
import { useApiError } from "@/hooks/api/useApiError";

export const useScrapMission = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: ({
      missionId,
      isScrapped,
    }: {
      missionId: number;
      isScrapped: boolean;
    }) => updateMissionStatus(missionId, isScrapped ? "NONE" : "SCRAP"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    },
    onError: handleError,
  });
};
