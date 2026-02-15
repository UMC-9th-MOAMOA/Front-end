import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecommendedMissions } from "@/apis/missions/recommendedMissions";

interface UseRecommendedMissionsParams {
  time?: number | null;
  refreshTrigger?: number;
}

export const useRecommendedMissions = ({
  time = null,
  refreshTrigger = 0,
}: UseRecommendedMissionsParams = {}) => {
  return useSuspenseQuery({
    queryKey: ["missions", "recommended", { time, refreshTrigger }],
    queryFn: () => getRecommendedMissions(time, refreshTrigger > 0),
  });
};
