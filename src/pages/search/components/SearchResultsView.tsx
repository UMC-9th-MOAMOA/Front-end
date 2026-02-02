import MissionCard from "@/components/MissionCard";
import { MOCK_SEARCH_RESULT_KEYWORDS } from "@/mocks/search/mission";
import KeywordChip from "./common/KeywordChip";

// TODO: 키워드 검색 API 연결 시 타입 수정 필요
interface Mission {
  id: number;
  title: string;
  keywords: string[];
  minute: number;
  category: string;
  quizCount: number;
  isLiked: boolean;
}

interface SearchResultsViewProps {
  selectedKeywords: string[];
  onKeywordClick: (keyword: string) => void;
  missions: Mission[];
}

export default function SearchResultsView({
  selectedKeywords,
  onKeywordClick,
  missions,
}: SearchResultsViewProps) {
  return (
    <>
      <div className="mt-28 flex items-center gap-16">
        <span className="body-2 shrink-0">추천 검색어</span>
        <div className="relative -mr-layout-side min-w-0 flex-1">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent" />
          <div className="overflow-x-auto">
            <div className="flex gap-8 pl-16">
              {MOCK_SEARCH_RESULT_KEYWORDS.map((keyword) => (
                <div key={keyword} className="shrink-0">
                  <KeywordChip
                    keyword={keyword}
                    isSelected={selectedKeywords.includes(keyword)}
                    onClick={() => onKeywordClick(keyword)}
                    size="lg"
                  />
                </div>
              ))}
              <div className="w-17 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-16 pb-38">
        {missions.map((mission) => (
          <MissionCard key={mission.id} {...mission} />
        ))}
      </div>
    </>
  );
}
