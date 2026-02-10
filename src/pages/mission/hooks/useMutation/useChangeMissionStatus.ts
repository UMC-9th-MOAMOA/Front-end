import { useMutation } from "@tanstack/react-query";
import { changeMissionStatus } from "@/apis/missions/missionAction";
import { useApiError } from "@/hooks/api/useApiError";
import type { ApiError } from "@/types/api/api";
import type { MissionStatusRequest } from "@/types/mission/mission";

interface ChangeMissionStatusParams {
  missionId: number;
  status: MissionStatusRequest;
}

export const useChangeMissionStatus = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: ({ missionId, status }: ChangeMissionStatusParams) =>
      changeMissionStatus(missionId, status),
    onError: (error: ApiError) => handleError(error),
  });
};
