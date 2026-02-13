import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecommendedMissions } from "@/apis/missions/recommendedMissions";

interface UseRecommendedMissionsParams {
  time?: number | null;
  isRefresh?: boolean;
}

export const useRecommendedMissions = ({
  time = null,
  isRefresh = false,
}: UseRecommendedMissionsParams = {}) => {
  return useSuspenseQuery({
    queryKey: ["missions", "recommended", { time, isRefresh }],
    queryFn: () => getRecommendedMissions(time, isRefresh),
  });
};
