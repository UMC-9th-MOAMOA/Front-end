import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import IcSearch from "@/assets/icons/ic_search.svg?react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import CategoryMissionList from "../components/CategoryMissionList";
import CategorySection from "../components/CategorySection";
import TodayMissionSection from "../components/TodayMissionSection";
import { useCategorySwipe } from "../hooks/useCategorySwipe";

export default function MainSearchView() {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory, swipeHandlers } =
    useCategorySwipe();

  return (
    <>
      <div className="mt-26">
        <button
          type="button"
          onClick={() => navigate("/search?mode=keyword")}
          className="flex w-full items-center gap-18 rounded-full border border-gray-400 bg-gray-100 px-17 py-8"
        >
          <IcSearch className="shrink-0 text-gray-500" />
          <span className="body-2 text-gray-400">키워드 검색</span>
        </button>
      </div>

      <Suspense
        fallback={
          <div className="mt-48 flex h-200 items-center justify-center">
            <LoadingSpinner className="size-60" />
          </div>
        }
      >
        <TodayMissionSection />
      </Suspense>
      <div className="-mx-layout-side mt-18 h-8 bg-gray-200" />

      <CategorySection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Suspense
        fallback={
          <div className="mt-30 flex items-center justify-center">
            <LoadingSpinner className="size-60" />
          </div>
        }
      >
        <CategoryMissionList
          selectedCategory={selectedCategory}
          swipeHandlers={swipeHandlers}
        />
      </Suspense>
    </>
  );
}
