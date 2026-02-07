import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { searchMissions } from "@/apis/search/search";

interface UseSearchMissionsParams {
  searchText?: string;
  keywords?: string[];
  seed: number;
}

export const useSearchMissions = ({
  searchText,
  keywords,
  seed,
}: UseSearchMissionsParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["missions", "search", { searchText, keywords, seed }],
    queryFn: ({ pageParam }) =>
      searchMissions({
        searchText,
        keywords,
        seed,
        page: pageParam,
        size: 10,
      }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.hasNext ? lastPageParam + 1 : undefined,
    initialPageParam: 0,
  });
};
