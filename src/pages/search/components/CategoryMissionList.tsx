import { useNavigate } from "react-router-dom";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import { Button } from "@/components/common/button/Button";
import MissionCard from "@/components/MissionCard";
import {
  CATEGORY_ID_MAP,
  type MainCategory,
} from "@/constants/missions/categories";
import { useCategoryMissions } from "../hooks/useQuery/useCategoryMissions";

interface CategoryMissionListProps {
  selectedCategory: MainCategory;
  swipeHandlers: Record<string, unknown>;
}

export default function CategoryMissionList({
  selectedCategory,
  swipeHandlers,
}: CategoryMissionListProps) {
  const navigate = useNavigate();
  const categoryId = CATEGORY_ID_MAP[selectedCategory];
  const { data } = useCategoryMissions({ categoryId });

  const categoryMissions = data.missions.map((m) => ({
    id: m.missionId,
    title: m.title,
    keywords: m.keywords,
    minute: m.durationMinutes,
    category: m.category,
    quizCount: m.quizCount,
    isLiked: m.isScrapped,
  }));

  const handleMoreClick = () => {
    navigate(`/search?mode=category&main=${selectedCategory}`);
  };

  return (
    <div className="min-h-[50vh] flex-1" {...swipeHandlers}>
      {categoryMissions.length === 0 ? (
        <div className="mt-50 flex justify-center">
          <span className="body-2 text-gray-400">미션이 없습니다</span>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
