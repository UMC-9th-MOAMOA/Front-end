import IcHeart from "@/assets/icons/ic_heart.svg?react";
import { cn } from "@/utils/cn/cn";

interface RecommendedMissionCardProps {
  title: string;
  keywords: string[];
  durationMinutes: number;
  category: string;
  description?: string;
  isScrapped?: boolean;
  onHeartClick?: () => void;
}

export default function RecommendedMissionCard({
  title,
  keywords,
  durationMinutes,
  category,
  description,
  isScrapped,
  onHeartClick,
}: RecommendedMissionCardProps) {
  return (
    <div className="w-180 rounded-xl border border-moamoa-200 bg-white px-16 py-18">
      <div className="flex items-center justify-between gap-8">
        <h3 className="body-2 truncate text-black">{title}</h3>
        <IcHeart
          className={cn("size-24 shrink-0 cursor-pointer text-moamoa-200", isScrapped && "fill-moamoa-100")}
          onClick={onHeartClick}
        />
      </div>

      <div className="-mx-16 mt-18 overflow-x-auto">
        <div className="flex gap-4 px-16">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="body-4 shrink-0 rounded-sm bg-moamoa-50 px-17 py-8 text-moamoa-500"
            >
              {keyword}
            </span>
          ))}
          <div className="w-16 shrink-0" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="body-2 flex items-center text-black">
          <span>예상 소요 시간 :</span>
          <span className="ml-3">{durationMinutes}분</span>
        </div>
        <div className="body-5 flex items-center text-black">
          <span>카테고리 :</span>
          <span className="ml-3">{category}</span>
        </div>
        {description && <p className="body-5 truncate text-black">{description}</p>}
      </div>
    </div>
  );
}
