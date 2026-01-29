import IcReload from "@/assets/icons/ic_reload.svg?react";
import { cn } from "@/utils/cn/cn";
import RecommendedMissionCard from "./common/RecommendedMissionCard";

interface Mission {
  id: number;
  title: string;
  keywords: string[];
  minute: number;
  category: string;
  description: string;
}

interface TodayMissionSectionProps {
  missions: Mission[];
  onRefresh?: () => void;
}

export default function TodayMissionSection({
  missions,
  onRefresh,
}: TodayMissionSectionProps) {
  return (
    <div className="mt-48">
      <div className="flex items-center justify-between px-1">
        <h2 className="heading-5 text-black">오늘의 미션 추천</h2>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-6"
          onClick={onRefresh}
        >
          <IcReload className="size-19 text-moamoa-400" />
          <span className="body-2 text-black">새로고침</span>
        </button>
      </div>

      <div className="-mx-layout-side mt-22 overflow-x-auto">
        <div className="flex gap-10">
          {missions.map((mission, index) => (
            <div
              key={mission.id}
              className={cn("shrink-0", index === 0 && "ml-layout-side")}
            >
              <RecommendedMissionCard
                title={mission.title}
                keywords={mission.keywords}
                minute={mission.minute}
                category={mission.category}
                description={mission.description}
              />
            </div>
          ))}

          <div className="w-15 shrink-0" />
        </div>
      </div>
    </div>
  );
}
