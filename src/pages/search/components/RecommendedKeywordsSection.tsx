import { Button } from "@/components/common/button/Button";
import type { Keyword, KeywordFilterTab } from "@/types/keyword/keyword";
import { KEYWORD_TYPE_MAP } from "@/types/keyword/keyword";
import { cn } from "@/utils/cn/cn";
import { useKeywords } from "../hooks/useQuery/keyword/useKeywords";
import KeywordChip from "./common/KeywordChip";

const FILTER_TABS = Object.keys(KEYWORD_TYPE_MAP) as KeywordFilterTab[];

const toRows = (keywords: Keyword[]) =>
  keywords.reduce<Keyword[][]>(
    (rows, keyword, i) => {
      rows[i % 3].push(keyword);
      return rows;
    },
    [[], [], []]
  );

interface RecommendedKeywordsSectionProps {
  selectedFilter: KeywordFilterTab;
  onFilterChange: (filter: KeywordFilterTab) => void;
  selectedKeywords: string[];
  onKeywordClick: (keyword: string) => void;
}

export default function RecommendedKeywordsSection({
  selectedFilter,
  onFilterChange,
  selectedKeywords,
  onKeywordClick,
}: RecommendedKeywordsSectionProps) {
  const { data } = useKeywords();

  const typeFilter = KEYWORD_TYPE_MAP[selectedFilter];
  const filteredKeywords =
    typeFilter === null
      ? data.keywords
      : data.keywords.filter((k) => k.type === typeFilter);

  const keywordRows = toRows(filteredKeywords);

  return (
    <div className="mt-37">
      <h3 className="body-2">추천 검색어</h3>

      <div className="mt-12 flex w-full rounded-full bg-moamoa-50">
        {FILTER_TABS.map((tab) => (
          <Button
            key={tab}
            onClick={() => onFilterChange(tab)}
            className={cn(
              "body-4 flex-1 rounded-full py-10",
              selectedFilter === tab
                ? "bg-moamoa-300 text-white"
                : "text-moamoa-300"
            )}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="-mx-layout-side mt-23 overflow-x-auto md:hidden">
        <div className="flex flex-col gap-12">
          {keywordRows.map((row) => (
            <div key={row[0]?.keywordId ?? "empty"} className="flex gap-8">
              {row.map((keyword, index) => (
                <div
                  key={keyword.keywordId}
                  className={cn("shrink-0", index === 0 && "ml-layout-side")}
                >
                  <KeywordChip
                    keyword={keyword.name}
                    isSelected={selectedKeywords.includes(keyword.name)}
                    onClick={() => onKeywordClick(keyword.name)}
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
        {filteredKeywords.map((keyword) => (
          <KeywordChip
            key={keyword.keywordId}
            keyword={keyword.name}
            isSelected={selectedKeywords.includes(keyword.name)}
            onClick={() => onKeywordClick(keyword.name)}
            size="lg"
          />
        ))}
      </div>
    </div>
  );
}
