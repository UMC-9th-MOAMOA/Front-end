import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcReload from "@/assets/icons/ic_reload.svg?react";
import { Button } from "@/components/common/button/Button";
import MissionCard from "@/components/MissionCard";
import { MOCK_MAIN_DATA } from "@/mocks/search/mission";

const ITEMS_PER_PAGE = 10;

export default function TodayMissionListView() {
  const navigate = useNavigate();
  const [missions] = useState(
    MOCK_MAIN_DATA.recommendedMissions.map((m) => ({
      id: m.missionId,
      title: m.title,
      keywords: m.keywords,
      minute: m.estimatedTime,
      category: m.categoryName,
      quizCount: m.quizCount,
      isLiked: m.isLiked,
    }))
  );
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    setDisplayedCount(ITEMS_PER_PAGE);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < missions.length) {
          setDisplayedCount((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, missions.length)
          );
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [displayedCount, missions.length]);

  return (
    <div>
      <div className="mt-32">
        <IcLeft
          className="size-24 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <h2 className="heading-2 -mt-19 text-center text-black">
        오늘의 미션
        <br className="min-[450px]:hidden" /> 추천 리스트입니다!
      </h2>

      <div className="mt-19 flex justify-end">
        <Button
          onClick={handleRefresh}
          leftIcon={<IcReload className="size-19" />}
          className="body-2 gap-6 rounded-2xl bg-moamoa-50 px-16 py-8 text-moamoa-400"
        >
          새로고침
        </Button>
      </div>

      <div className="mt-16 -mb-96 flex flex-col gap-16">
        {missions.slice(0, displayedCount).map((mission) => (
          <MissionCard key={mission.id} {...mission} />
        ))}
        <div ref={observerTarget} className="h-1" />
      </div>
    </div>
  );
}
