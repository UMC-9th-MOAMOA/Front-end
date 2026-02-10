import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getMyMissions } from "@/apis/missions/myMissions";
import type {
  MyMissionCondition,
  MyMissionStatus,
} from "@/types/mission/myMissions";

interface UseMyMissionsInfiniteParams {
  status: MyMissionStatus;
  condition?: MyMissionCondition;
  categoryId?: number;
}

export const useMyMissionsInfinite = ({
  status,
  condition = "LATEST",
  categoryId,
}: UseMyMissionsInfiniteParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["missions", "scrapped", status, condition, categoryId ?? "all"],
    queryFn: ({ pageParam }) =>
      getMyMissions({
        status,
        condition,
        categoryId,
        page: pageParam,
        size: 10,
      }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
    initialPageParam: 0,
  });
};
