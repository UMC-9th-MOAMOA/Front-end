import type { QueryKey } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMissionStatus } from "@/apis/missions/missions";
import { useApiError } from "@/hooks/api/useApiError";
import type {
  MissionApiResponse,
  MissionsPageResponse,
} from "@/types/mission/mission";

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

    onMutate: async ({ missionId, isScrapped }) => {
      await queryClient.cancelQueries({ queryKey: ["missions"] });

      const previousQueries = queryClient.getQueriesData<unknown>({
        queryKey: ["missions"],
      });

      const toggle = (m: MissionApiResponse) =>
        m.missionId === missionId ? { ...m, isScrapped: !isScrapped } : m;

      previousQueries.forEach(([queryKey, data]) => {
        if (!data) return;

        //추천 미션
        if (Array.isArray(data)) {
          queryClient.setQueryData(queryKey, data.map(toggle));
          return;
        }

        //카테고리 검색 무한스크롤(마이페이지 예정)
        const obj = data as Record<string, unknown>;
        if ("pages" in obj) {
          const pages = obj.pages as MissionsPageResponse[];
          queryClient.setQueryData(queryKey, {
            ...obj,
            pages: pages.map((page) => ({
              ...page,
              missions: page.missions.map(toggle),
            })),
          });
          return;
        }

        //카테고리 검색 미리보기
        if ("missions" in obj) {
          const page = data as MissionsPageResponse;
          queryClient.setQueryData(queryKey, {
            ...page,
            missions: page.missions.map(toggle),
          });
        }
      });

      return { previousQueries };
    },

    onError: (error, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(
          ([queryKey, data]: [QueryKey, unknown]) => {
            queryClient.setQueryData(queryKey, data);
          }
        );
      }
      handleError(error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["missions"] });
    },
  });
};
