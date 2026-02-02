import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecommendedMissions } from "@/apis/missions/recommendedMissions";

interface UseRecommendedMissionsParams {
  time?: number | null;
}

export const useRecommendedMissions = ({
  time = null,
}: UseRecommendedMissionsParams = {}) => {
  return useSuspenseQuery({
    queryKey: ["missions", "recommended", { time }],
    queryFn: () => getRecommendedMissions(time),
  });
};
