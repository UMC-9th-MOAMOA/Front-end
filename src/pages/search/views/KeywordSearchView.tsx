import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IcCheck from "@/assets/icons/ic_check.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import AsyncBoundary from "@/components/AsyncBoundary";
import type { KeywordFilterTab } from "@/types/keyword/keyword";
import SearchBar from "../components/common/SearchBar";
import RecommendedKeywordsSection from "../components/RecommendedKeywordsSection";
import SearchResultsView from "../components/SearchResultsView";
import SelectedKeywordsBar from "../components/SelectedKeywordsBar";

export default function KeywordSearchView() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<KeywordFilterTab>("전체");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const seedRef = useRef(Date.now());

  const handleBack = () => {
    if (isSearched) {
      setIsSearched(false);
      setSearchValue("");
      setSelectedKeywords([]);
    } else {
      navigate(-1);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleSearch = () => {
    if (selectedKeywords.length > 0 || searchValue.trim()) {
      seedRef.current = Date.now();
      setIsSearched(true);
    }
  };

  return (
    <>
      <div className="mt-41 flex items-center gap-12">
        <button type="button" onClick={handleBack}>
          <IcLeft className="size-24 text-gray-600" />
        </button>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={handleSearch}
          showSearchButton={selectedKeywords.length > 0}
        />
      </div>

      <SelectedKeywordsBar
        keywords={selectedKeywords}
        onKeywordClick={handleKeywordClick}
        isSearched={isSearched}
      />

      {isSearched ? (
        <AsyncBoundary>
          <SearchResultsView
            searchText={searchValue}
            selectedKeywords={selectedKeywords}
            onKeywordClick={handleKeywordClick}
            seed={seedRef.current}
          />
        </AsyncBoundary>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <IcCheck className="size-24 text-moamoa-300" />
            <p className="body-1">
              어떤 <span className="heading-3">미션</span>을 찾고 계신가요?
            </p>
          </div>

          <AsyncBoundary>
            <RecommendedKeywordsSection
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              selectedKeywords={selectedKeywords}
              onKeywordClick={handleKeywordClick}
            />
          </AsyncBoundary>
        </>
      )}
    </>
  );
}
