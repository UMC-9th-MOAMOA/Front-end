import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MAIN_CATEGORIES } from "@/constants/missions/categories";
import CategoryButton from "../components/CategoryButton";
import CategoryMissionInfiniteList from "../components/CategoryMissionInfiniteList";
import SubCategoryButton from "../components/SubCategoryButton";
import { useCategoryDetailState } from "../hooks/useCategoryDetailState";

export default function CategoryDetailView() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    subCategories,
    categoryId,
    seed,
    swipeHandlers,
    handleSubCategoryClick,
  } = useCategoryDetailState();

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
              isSelected={selectedSubCategory.categoryId === sub.categoryId}
              onClick={handleSubCategoryClick}
            />
          ))}
          <div className="w-15 shrink-0 min-[400px]:hidden" />
        </div>
      </div>

      {selectedSubCategory.categoryId !== 0 && (
        <Suspense
          fallback={
            <div className="mt-30 flex items-center justify-center">
              <LoadingSpinner className="size-60" />
            </div>
          }
        >
          <CategoryMissionInfiniteList
            key={`${categoryId}-${selectedSubCategory.categoryId}`}
            categoryId={categoryId}
            subcategoryId={selectedSubCategory.categoryId}
            seed={seed}
            swipeHandlers={swipeHandlers}
          />
        </Suspense>
      )}
    </>
  );
}
