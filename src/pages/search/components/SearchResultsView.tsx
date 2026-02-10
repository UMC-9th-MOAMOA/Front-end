import AsyncBoundary from "@/components/AsyncBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import MissionCard from "@/components/MissionCard";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useScrapMission } from "@/hooks/useScrapMission";
import { useSearchMissions } from "../hooks/useQuery/useSearchMissions";
import NoSearchResults from "./NoSearchResults";
import RelatedKeywordsBar from "./RelatedKeywordsBar";

interface SearchResultsViewProps {
  searchText: string;
  selectedKeywords: string[];
  onKeywordClick: (keyword: string) => void;
  seed: number;
}

export default function SearchResultsView({
  searchText,
  selectedKeywords,
  onKeywordClick,
  seed,
}: SearchResultsViewProps) {
  const debouncedSearchText = useDebounce(searchText, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchMissions({
      searchText: debouncedSearchText || undefined,
      keywords: selectedKeywords.length > 0 ? selectedKeywords : undefined,
      seed,
    });

  const { ref, isFetchingNextPage: isFetching } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const scrapMutation = useScrapMission();
  const missions = data.pages.flatMap((page) => page.missions);

  return (
    <>
      {searchText && (
        <AsyncBoundary loadingFallback={null} errorFallback={null}>
          <RelatedKeywordsBar
            keyword={searchText}
            selectedKeywords={selectedKeywords}
            onKeywordClick={onKeywordClick}
          />
        </AsyncBoundary>
      )}

      <div className="mt-12 flex flex-col gap-16 pb-38">
        {missions.length === 0 ? (
          <NoSearchResults searchText={debouncedSearchText} />
        ) : (
          missions.map((mission) => (
            <MissionCard
              key={mission.missionId}
              id={mission.missionId}
              title={mission.title}
              keywords={mission.keywords}
              minute={mission.durationMinutes}
              category={mission.category}
              quizCount={mission.quizCount}
              isScrapped={mission.isScrapped}
              onHeartClick={() =>
                scrapMutation.mutate({
                  missionId: mission.missionId,
                  isScrapped: mission.isScrapped,
                })
              }
            />
          ))
        )}
        {hasNextPage && (
          <div ref={ref} className="flex justify-center py-20">
            {isFetching && <LoadingSpinner className="size-40" />}
          </div>
        )}
      </div>
    </>
  );
}
