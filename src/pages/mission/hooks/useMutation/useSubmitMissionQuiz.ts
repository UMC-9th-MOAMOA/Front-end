import { useMutation } from "@tanstack/react-query";
import { submitMissionQuiz } from "@/apis/missions/missionAction";
import { useApiError } from "@/hooks/api/useApiError";
import type { ApiError } from "@/types/api/api";
import type { SubmitQuizRequest } from "@/types/mission/mission";

interface SubmitMissionQuizParams {
  missionId: number;
  submissions: SubmitQuizRequest;
}

export const useSubmitMissionQuiz = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: ({ missionId, submissions }: SubmitMissionQuizParams) =>
      submitMissionQuiz(missionId, submissions),
    onError: (error: ApiError) => handleError(error),
  });
};
