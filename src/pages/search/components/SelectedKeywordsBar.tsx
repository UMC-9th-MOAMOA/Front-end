import { cn } from "@/utils/cn/cn";
import KeywordChip from "./common/KeywordChip";

interface SelectedKeywordsBarProps {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
  isSearched: boolean;
}

export default function SelectedKeywordsBar({
  keywords,
  onKeywordClick,
  isSearched,
}: SelectedKeywordsBarProps) {
  if (isSearched && keywords.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("-mx-layout-side mt-layout-side overflow-x-auto py-5", !isSearched && "mb-28")}
    >
      <div className={cn("flex gap-2", !isSearched && "min-h-30")}>
        {keywords.length > 0 ? (
          <>
            {keywords.map((keyword, index) => (
              <div
                key={keyword}
                className={cn("shrink-0", index === 0 && "ml-layout-side")}
              >
                <KeywordChip
                  keyword={keyword}
                  onClick={() => onKeywordClick(keyword)}
                />
              </div>
            ))}
            <div className="w-23 shrink-0" />
          </>
        ) : (
          <div className="ml-layout-side" />
        )}
      </div>
    </div>
  );
}
