import { useNavigate } from "react-router-dom";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import IcSearch from "@/assets/icons/ic_search.svg?react";
import { Button } from "@/components/common/button/Button";
import {
  MOCK_CATEGORY_MISSIONS,
  MOCK_MAIN_DATA,
  MOCK_SUB_CATEGORIES,
} from "@/mocks/search/mission";
import CategorySection from "../components/CategorySection";
import MissionCard from "../components/common/MissionCard";
import TodayMissionSection from "../components/TodayMissionSection";
import { useCategorySwipe } from "../hooks/useCategorySwipe";

const recommendedMissions = MOCK_MAIN_DATA.recommendedMissions.map((m) => ({
  id: m.missionId,
  title: m.title,
  keywords: m.keywords,
  minute: m.estimatedTime,
  category: m.categoryName,
  description: m.description ?? "",
}));

export default function MainSearchView() {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory, swipeHandlers } =
    useCategorySwipe();

  const categoryMissions = (MOCK_CATEGORY_MISSIONS[selectedCategory] ?? [])
    .slice(0, 3)
    .map((m) => ({
      id: m.missionId,
      title: m.title,
      keywords: m.keywords,
      minute: m.estimatedTime,
      category: m.categoryName,
      quizCount: m.quizCount,
      isLiked: m.isLiked,
    }));

  const handleMoreClick = () => {
    const firstSub = MOCK_SUB_CATEGORIES[selectedCategory]?.[0]?.name ?? "";
    navigate(`/search?mode=category&main=${selectedCategory}&sub=${firstSub}`);
  };

  return (
    <>
      <div className="mt-26">
        <button
          type="button"
          onClick={() => navigate("/search?mode=keyword")}
          className="flex w-full items-center gap-18 rounded-full bg-gray-200 px-17 py-8"
        >
          <IcSearch className="shrink-0" />
          <span className="body-2 text-gray-400">키워드 검색</span>
        </button>
      </div>

      <TodayMissionSection missions={recommendedMissions} />
      <div className="-mx-layout-side mt-18 h-8 bg-gray-200" />

      <CategorySection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="min-h-[50vh] flex-1" {...swipeHandlers}>
        <div className="mt-28 flex flex-col gap-16">
          {categoryMissions.map((m) => (
            <MissionCard key={m.id} {...m} />
          ))}
        </div>

        <div className="mt-27 flex justify-center pb-38">
          <Button
            leftIcon={<IcPlus className="text-gray-600" />}
            onClick={handleMoreClick}
            className="body-2 gap-6 rounded-2xl bg-gray-200 px-17 py-8 text-gray-600"
          >
            더보기
          </Button>
        </div>
      </div>
    </>
  );
}
