import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategoryMissions } from "@/apis/missions/categories";

interface UseCategoryMissionsParams {
  categoryId: number;
}

export const useCategoryMissions = ({
  categoryId,
}: UseCategoryMissionsParams) => {
  return useSuspenseQuery({
    queryKey: ["missions", "category", categoryId],
    queryFn: () => getCategoryMissions({ categoryId }),
  });
};
