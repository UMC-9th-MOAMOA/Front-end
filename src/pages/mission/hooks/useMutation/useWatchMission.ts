import { useMutation } from "@tanstack/react-query";
import { watchMission } from "@/apis/missions/missionAction";
import { useApiError } from "@/hooks/api/useApiError";
import type { ApiError } from "@/types/api/api";

export const useWatchMission = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (missionId: number) => watchMission(missionId),
    onError: (error: ApiError) => handleError(error),
  });
};
