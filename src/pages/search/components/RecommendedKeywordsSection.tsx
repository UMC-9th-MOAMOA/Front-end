import {
  KEYWORD_FILTER_TABS,
  MOCK_RECOMMENDED_KEYWORDS,
} from "@/mocks/search/mission";
import KeywordChip from "./common/KeywordChip";

interface RecommendedKeywordsSectionProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  selectedKeywords: string[];
  onKeywordClick: (keyword: string) => void;
}

export default function RecommendedKeywordsSection({
  selectedFilter,
  onFilterChange,
  selectedKeywords,
  onKeywordClick,
}: RecommendedKeywordsSectionProps) {
  return (
    <div className="mt-37">
      <h3 className="body-2">추천 검색어</h3>

      <div className="-mx-0.5 mt-12 flex w-full rounded-full bg-moamoa-50">
        {KEYWORD_FILTER_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onFilterChange(tab)}
            className={`body-4 w-81 rounded-full py-10 ${
              selectedFilter === tab
                ? "bg-moamoa-300 text-white"
                : "text-moamoa-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 추천 검색어 그룹 - 3줄 가로 스크롤 (gap-8 + w-17 spacer = 25px) */}
      <div className="-mx-layout-side mt-23 overflow-x-auto">
        <div className="flex flex-col gap-12">
          {MOCK_RECOMMENDED_KEYWORDS.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-8">
              {row.map((keyword, index) => (
                <div
                  key={keyword}
                  className={`shrink-0 ${index === 0 ? "ml-layout-side" : ""}`}
                >
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
          ))}
        </div>
      </div>
    </div>
  );
}
