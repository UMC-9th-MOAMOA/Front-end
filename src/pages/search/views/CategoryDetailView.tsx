import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MAIN_CATEGORIES,
  MOCK_DETAIL_MISSIONS,
  MOCK_SUB_CATEGORIES,
} from "@/mocks/search/mission";
import CategoryButton from "../components/CategoryButton";
import MissionCard from "../components/common/MissionCard";
import SubCategoryButton from "../components/SubCategoryButton";

export default function CategoryDetailView() {
  const [searchParams] = useSearchParams();
  const initialMain = searchParams.get("main") || "경제와 금융";
  const initialSub =
    searchParams.get("sub") ||
    MOCK_SUB_CATEGORIES[initialMain]?.[0]?.name ||
    "";

  const [selectedMainCategory, setSelectedMainCategory] = useState(initialMain);

  const subCategories = MOCK_SUB_CATEGORIES[selectedMainCategory] ?? [];

  const [selectedSubCategory, setSelectedSubCategory] = useState(initialSub);

  const handleMainCategoryChange = (category: string) => {
    setSelectedMainCategory(category);
    const firstSub = MOCK_SUB_CATEGORIES[category]?.[0]?.name ?? "";
    setSelectedSubCategory(firstSub);
  };

  const allMissions = (MOCK_DETAIL_MISSIONS[selectedMainCategory] ?? []).map(
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

  const missions = allMissions.filter(
    (m) => m.category === selectedSubCategory
  );

  return (
    <>
      <div className="mt-30 overflow-x-auto px-15.5">
        <div className="flex gap-26">
          {MAIN_CATEGORIES.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedMainCategory === category}
              onClick={handleMainCategoryChange}
            />
          ))}
        </div>
      </div>

      <div className="-mx-layout-side mt-1 h-2 bg-gray-200" />

      <div className="-mx-layout-side mt-18 overflow-x-auto">
        <div className="flex gap-10">
          {subCategories.map((sub, index) => (
            <div
              key={sub.categoryId}
              className={index === 0 ? "ml-layout-side" : ""}
            >
              <SubCategoryButton
                category={sub}
                isSelected={selectedSubCategory === sub.name}
                onClick={setSelectedSubCategory}
              />
            </div>
          ))}
          <div className="w-15 shrink-0" />
        </div>
      </div>

      <div className="mt-19 flex flex-col gap-16 pb-38">
        {missions.map((mission) => (
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
    </>
  );
}
