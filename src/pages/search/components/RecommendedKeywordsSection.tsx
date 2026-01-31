import { Button } from "@/components/common/button/Button";
import {
  KEYWORD_FILTER_TABS,
  MOCK_RECOMMENDED_KEYWORDS,
} from "@/mocks/search/mission";
import { cn } from "@/utils/cn/cn";
import KeywordChip from "./common/KeywordChip";

const FLAT_KEYWORDS = MOCK_RECOMMENDED_KEYWORDS.flat();

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

      <div className="mt-12 flex w-full rounded-full bg-moamoa-50">
        {KEYWORD_FILTER_TABS.map((tab) => (
          <Button
            key={tab}
            onClick={() => onFilterChange(tab)}
            className={cn(
              "body-4 flex-1 rounded-full py-10",
              selectedFilter === tab
                ? "bg-moamoa-300 text-white"
                : "text-moamoa-300",
            )}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="-mx-layout-side mt-23 overflow-x-auto md:hidden">
        <div className="flex flex-col gap-12">
          {MOCK_RECOMMENDED_KEYWORDS.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-8">
              {row.map((keyword, index) => (
                <div
                  key={keyword}
                  className={cn("shrink-0", index === 0 && "ml-layout-side")}
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

      <div className="mt-23 mb-20 hidden flex-wrap gap-8 md:flex">
        {FLAT_KEYWORDS.map((keyword) => (
          <KeywordChip
            key={keyword}
            keyword={keyword}
            isSelected={selectedKeywords.includes(keyword)}
            onClick={() => onKeywordClick(keyword)}
            size="lg"
          />
        ))}
      </div>
    </div>
  );
}
