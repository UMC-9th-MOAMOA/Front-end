import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getCategoryMissions } from "@/apis/missions/categories";

interface UseCategoryMissionsInfiniteParams {
  categoryId: number;
  subCategoryId: number;
  seed: number;
}

export const useCategoryMissionsInfinite = ({
  categoryId,
  subCategoryId,
  seed,
}: UseCategoryMissionsInfiniteParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["missions", "category", categoryId, subCategoryId, seed],
    queryFn: ({ pageParam }) =>
      getCategoryMissions({
        categoryId,
        subCategoryId,
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
