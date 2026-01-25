import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MAIN_CATEGORIES,
  MOCK_DETAIL_MISSIONS,
  MOCK_SUB_CATEGORIES,
  type MainCategory,
} from "@/mocks/search/mission";
import CategoryButton from "../components/CategoryButton";
import MissionCard from "../components/common/MissionCard";
import SubCategoryButton from "../components/SubCategoryButton";
import { useCategorySwipe } from "../hooks/useCategorySwipe";

export default function CategoryDetailView() {
  const [searchParams] = useSearchParams();
  const mainParam = searchParams.get("main") || "";

  const validMainCategory: MainCategory = MAIN_CATEGORIES.includes(
    mainParam as MainCategory
  )
    ? (mainParam as MainCategory)
    : "경제와 금융";

  const initialSub =
    searchParams.get("sub") ||
    MOCK_SUB_CATEGORIES[validMainCategory]?.[0]?.name ||
    "";

  const [subCategory, setSubCategory] = useState(initialSub);

  const { selectedCategory, setSelectedCategory, swipeHandlers } =
    useCategorySwipe(validMainCategory, (category) => {
      setSubCategory(MOCK_SUB_CATEGORIES[category]?.[0]?.name ?? "");
    });

  const subCategories = MOCK_SUB_CATEGORIES[selectedCategory] ?? [];

  const missions = (MOCK_DETAIL_MISSIONS[selectedCategory] ?? [])
    .filter((m) => m.categoryName === subCategory)
    .map((m) => ({
      id: m.missionId,
      title: m.title,
      keywords: m.keywords,
      minute: m.estimatedTime,
      category: m.categoryName,
      quizCount: m.quizCount,
      isLiked: m.isLiked,
    }));

  return (
    <>
      <div className="-mx-layout-side mt-30 overflow-x-auto">
        <div className="flex min-w-full gap-26 px-layout-side">
          {MAIN_CATEGORIES.map((cat) => (
            <CategoryButton
              key={cat}
              category={cat}
              isSelected={selectedCategory === cat}
              onClick={setSelectedCategory}
            />
          ))}
        </div>
      </div>

      <div className="-mx-layout-side mt-1 h-2 bg-gray-200" />

      <div className="-mx-layout-side mt-18 overflow-x-auto">
        <div className="flex min-w-full gap-10 px-layout-side">
          {subCategories.map((sub) => (
            <SubCategoryButton
              key={sub.categoryId}
              category={sub}
              isSelected={subCategory === sub.name}
              onClick={setSubCategory}
            />
          ))}
          <div className="w-15 shrink-0 min-[400px]:hidden" />
        </div>
      </div>

      <div className="min-h-[50vh] flex-1" {...swipeHandlers}>
        <div className="mt-19 flex flex-col gap-16 pb-38">
          {missions.map((m) => (
            <MissionCard key={m.id} {...m} />
          ))}
        </div>
      </div>
    </>
  );
}
