import { useMemo } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import MissionCard from "@/components/MissionCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useCategoryMissionsInfinite } from "../hooks/useQuery/category/useCategoryMissionsInfinite";

interface CategoryMissionInfiniteListProps {
  categoryId: number;
  subCategoryId: number;
  seed: number;
  swipeHandlers: Record<string, unknown>;
}

export default function CategoryMissionInfiniteList({
  categoryId,
  subCategoryId,
  seed,
  swipeHandlers,
}: CategoryMissionInfiniteListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCategoryMissionsInfinite({
      categoryId,
      subCategoryId,
      seed,
    });

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const missions = useMemo(
    () =>
      data.pages
        .flatMap((page) => page.missions)
        .map((m) => ({
          id: m.missionId,
          title: m.title,
          keywords: m.keywords,
          minute: m.durationMinutes,
          category: m.category,
          quizCount: m.quizCount,
          isLiked: m.isScrapped,
        })),
    [data.pages]
  );

  if (missions.length === 0) {
    return (
      <div className="mt-50 flex justify-center">
        <span className="body-2 text-gray-400">미션이 없습니다</span>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] flex-1" {...swipeHandlers}>
      <div className="mt-19 flex flex-col gap-16 pb-38">
        {missions.map((m) => (
          <MissionCard key={m.id} {...m} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-20">
          {isFetchingNextPage && <LoadingSpinner className="size-40" />}
        </div>
      )}
    </div>
  );
}
