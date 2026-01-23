import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import IcSearch from "@/assets/icons/ic_search.svg?react";
import {
  MOCK_CATEGORY_MISSIONS,
  MOCK_MAIN_DATA,
  MOCK_SUB_CATEGORIES,
} from "@/mocks/search/mission";
import CategorySection from "../components/CategorySection";
import MissionCard from "../components/common/MissionCard";
import TodayMissionSection from "../components/TodayMissionSection";

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
  const [selectedCategory, setSelectedCategory] = useState("경제와 금융");

  const categoryMissions = (MOCK_CATEGORY_MISSIONS[selectedCategory] ?? []).map(
    (m) => ({
      id: m.missionId,
      title: m.title,
      keywords: m.keywords,
      minute: m.estimatedTime,
      category: m.categoryName,
      quizCount: m.quizCount,
      isLiked: m.isLiked,
    })
  );

  const handleSearchBarClick = () => {
    navigate("/search?mode=keyword");
  };

  const handleMoreClick = () => {
    const firstSub = MOCK_SUB_CATEGORIES[selectedCategory]?.[0]?.name ?? "";
    navigate(`/search?mode=category&main=${selectedCategory}&sub=${firstSub}`);
  };

  return (
    <>
      <div className="mt-26">
        <button
          type="button"
          onClick={handleSearchBarClick}
          className="flex w-full items-center gap-18 rounded-full bg-gray-200 px-17 py-8"
        >
          <IcSearch className="shrink-0" />
          <span className="body-2 text-gray-400">키워드 검색</span>
        </button>
      </div>

      <TodayMissionSection missions={recommendedMissions} />

      <div className="-mx-layout-side mt-18 h-8 bg-gray-200" />

      <CategorySection onCategoryChange={setSelectedCategory} />

      <div className="mt-28 flex flex-col gap-16">
        {categoryMissions.slice(0, 3).map((mission) => (
          <MissionCard
            key={mission.id}
            title={mission.title}
            keywords={mission.keywords}
            minute={mission.minute}
            category={mission.category}
            quizCount={mission.quizCount}
            isLiked={mission.isLiked}
          />
        ))}
      </div>

      <div className="mt-27 flex justify-center pb-38">
        <button
          type="button"
          onClick={handleMoreClick}
          className="flex items-center gap-6 rounded-2xl bg-gray-200 px-17 py-8"
        >
          <IcPlus className="text-gray-600" />
          <span className="body-2 text-gray-600">더보기</span>
        </button>
      </div>
    </>
  );
}
