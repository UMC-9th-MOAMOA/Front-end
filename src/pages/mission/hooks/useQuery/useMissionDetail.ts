import { useSuspenseQuery } from "@tanstack/react-query";
import { getMissionDetail } from "@/apis/missions/missionAction";

export const useMissionDetail = (missionId: number) => {
  return useSuspenseQuery({
    queryKey: ["missions", "detail", missionId],
    queryFn: () => getMissionDetail(missionId),
  });
};
