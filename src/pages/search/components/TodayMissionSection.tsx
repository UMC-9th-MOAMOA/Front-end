import IcReload from "@/assets/icons/ic_reload.svg?react";
import { useScrapMission } from "@/hooks/useScrapMission";
import { cn } from "@/utils/cn/cn";
import { useRecommendedMissions } from "../hooks/useQuery/useRecommendedMissions";
import RecommendedMissionCard from "./common/RecommendedMissionCard";

export default function TodayMissionSection() {
  const { data: missions, refetch } = useRecommendedMissions({ time: null });
  const scrapMutation = useScrapMission();
  return (
    <div className="mt-48">
      <div className="flex items-center justify-between px-1">
        <h2 className="heading-5 text-black">오늘의 미션 추천</h2>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-6"
          onClick={() => refetch()}
        >
          <IcReload className="size-19 text-moamoa-400" />
          <span className="body-2 text-black">새로고침</span>
        </button>
      </div>

      <div className="-mx-layout-side mt-22 overflow-x-auto">
        {missions.length === 0 ? (
          <div className="flex h-200 items-center justify-center">
            <span className="body-2 text-gray-400">추천 미션이 없습니다</span>
          </div>
        ) : (
          <div className="flex gap-10">
            {missions.map((mission, index) => (
              <div
                key={mission.missionId}
                className={cn("shrink-0", index === 0 && "ml-layout-side")}
              >
                <RecommendedMissionCard
                  title={mission.title}
                  keywords={mission.keywords}
                  durationMinutes={mission.durationMinutes}
                  category={mission.category}
                  description={mission.description}
                  isScrapped={mission.isScrapped}
                  onHeartClick={() =>
                    scrapMutation.mutate({
                      missionId: mission.missionId,
                      isScrapped: mission.isScrapped,
                    })
                  }
                />
              </div>
            ))}

            <div className="w-15 shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}
