import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getCategoryMissions } from "@/apis/missions/categories";

interface UseCategoryMissionsInfiniteParams {
  categoryId: number;
  subcategoryId: number;
  seed: number;
}

export const useCategoryMissionsInfinite = ({
  categoryId,
  subcategoryId,
  seed,
}: UseCategoryMissionsInfiniteParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["missions", "category", categoryId, subcategoryId, seed],
    queryFn: ({ pageParam }) =>
      getCategoryMissions({
        categoryId,
        subcategoryId,
        page: pageParam,
        size: 10,
        seed,
      }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.hasNext ? lastPageParam + 1 : undefined;
    },
    initialPageParam: 0,
  });
};
