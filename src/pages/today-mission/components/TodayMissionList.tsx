import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IcSquirrelNoRecommend from "@/assets/icons/mission/ic_squirrel_no_recommend.svg?react";
import MissionCard from "@/components/MissionCard";
import { useScrapMission } from "@/hooks/useScrapMission";
import { useRecommendedMissions } from "@/pages/search/hooks/useQuery/useRecommendedMissions";

const ITEMS_PER_PAGE = 10;

interface TodayMissionListProps {
  refreshTrigger?: number;
}

export default function TodayMissionList({
  refreshTrigger = 0,
}: TodayMissionListProps) {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time");
  const timeValue = time ? Number(time) : null;

  const { data: missions } = useRecommendedMissions({
    time: timeValue,
    refreshTrigger,
  });
  const scrapMutation = useScrapMission();

  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);

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

  if (!missions || missions.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="heading-6 text-gray-500">
          새로운 미션을 준비 중이에요.
        </span>
        <IcSquirrelNoRecommend className="mt-19" />
      </div>
    );
  }

  return (
    <div className="mt-16 -mb-96 flex flex-col gap-16">
      {missions.slice(0, displayedCount).map((mission) => (
        <MissionCard
          key={mission.missionId}
          id={mission.missionId}
          title={mission.title}
          keywords={mission.keywords}
          minute={mission.durationMinutes}
          category={mission.category}
          quizCount={mission.quizCount}
          isScrapped={mission.isScrapped}
          onHeartClick={() =>
            scrapMutation.mutate({
              missionId: mission.missionId,
              isScrapped: mission.isScrapped,
            })
          }
        />
      ))}
      <div ref={observerTarget} className="h-1" />
    </div>
  );
}
