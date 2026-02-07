import KeywordChip from "@/pages/search/components/common/KeywordChip";
import { useRelatedKeywords } from "../hooks/useQuery/useRelatedKeywords";

interface RelatedKeywordsBarProps {
  keyword: string;
  selectedKeywords: string[];
  onKeywordClick: (keyword: string) => void;
}

export default function RelatedKeywordsBar({
  keyword,
  selectedKeywords,
  onKeywordClick,
}: RelatedKeywordsBarProps) {
  const { data } = useRelatedKeywords(keyword);

  if (!data?.keywords?.length) return null;

  return (
    <div className="mt-10 flex items-center gap-16">
      <span className="body-2 shrink-0">추천 검색어</span>
      <div className="relative -mr-layout-side min-w-0 flex-1">
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent" />
        <div className="overflow-x-auto">
          <div className="flex gap-8 pl-16">
            {data.keywords.map((kw) => (
              <div key={kw.keywordId} className="shrink-0">
                <KeywordChip
                  keyword={kw.name}
                  isSelected={selectedKeywords.includes(kw.name)}
                  onClick={() => onKeywordClick(kw.name)}
                />
              </div>
            ))}
            <div className="w-17 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
