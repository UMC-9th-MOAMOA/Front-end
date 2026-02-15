import AsyncBoundary from "@/components/AsyncBoundary";
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

      <div
        key={selectedCategory}
        className="-mx-layout-side mt-18 overflow-x-auto"
      >
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
        <AsyncBoundary>
          <CategoryMissionInfiniteList
            key={`${categoryId}-${selectedSubCategory.categoryId}`}
            categoryId={categoryId}
            subCategoryId={selectedSubCategory.categoryId}
            seed={seed}
            swipeHandlers={swipeHandlers}
          />
        </AsyncBoundary>
      )}
    </>
  );
}
