import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcCheck from "@/assets/icons/ic_check.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import { MOCK_KEYWORD_SEARCH_MISSIONS } from "@/mocks/search/mission";
import SearchBar from "../components/common/SearchBar";
import RecommendedKeywordsSection from "../components/RecommendedKeywordsSection";
import SearchResultsView from "../components/SearchResultsView";
import SelectedKeywordsBar from "../components/SelectedKeywordsBar";

export default function KeywordSearchView() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isSearched, setIsSearched] = useState(false);

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
      setIsSearched(true);
    }
  };

  // TODO: 키워드 검색 API 연결 시 수정
  const missions = MOCK_KEYWORD_SEARCH_MISSIONS.map((m) => ({
    id: m.missionId,
    title: m.title,
    keywords: m.keywords,
    minute: m.durationMinutes,
    category: m.category,
    quizCount: m.quizCount,
    isLiked: m.isScrapped,
  }));

  return (
    <>
      <div className="mt-41 flex items-center gap-12">
        <button type="button" onClick={handleBack}>
          <IcLeft className="size-24" />
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
        <SearchResultsView
          selectedKeywords={selectedKeywords}
          onKeywordClick={handleKeywordClick}
          missions={missions}
        />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <IcCheck className="size-24 text-moamoa-300" />
            <p className="body-1">
              어떤 <span className="heading-3">미션</span>을 찾고 계신가요?
            </p>
          </div>

          <RecommendedKeywordsSection
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            selectedKeywords={selectedKeywords}
            onKeywordClick={handleKeywordClick}
          />
        </>
      )}
    </>
  );
}
