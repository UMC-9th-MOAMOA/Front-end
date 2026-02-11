import { useSuspenseQuery } from "@tanstack/react-query";
import { getMissionDetail } from "@/apis/missions/missionDetail";

export const useMissionDetail = (missionId: number) =>
  useSuspenseQuery({
    queryKey: ["missions", "detail", missionId],
    queryFn: () => getMissionDetail(missionId),
  });
