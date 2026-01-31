import IcHeart from "@/assets/icons/ic_heart.svg?react";
import { cn } from "@/utils/cn/cn";

interface RecommendedMissionCardProps {
  title: string;
  keywords: string[];
  minute: number;
  category: string;
  description: string;
  isLiked?: boolean;
  onHeartClick?: () => void;
}

export default function RecommendedMissionCard({
  title,
  keywords,
  minute,
  category,
  description,
  isLiked,
  onHeartClick,
}: RecommendedMissionCardProps) {
  return (
    <div className="w-180 rounded-xl border border-moamoa-200 bg-white px-16 py-18">
      <div className="flex items-center justify-between gap-8">
        <h3 className="body-2 truncate text-black">{title}</h3>
        <IcHeart
          className={cn("size-24 shrink-0 cursor-pointer text-moamoa-100", isLiked && "fill-moamoa-100")}
          onClick={onHeartClick}
        />
      </div>

      <div className="mt-18 flex flex-wrap gap-4">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="body-4 rounded-sm bg-moamoa-50 px-17 py-8 text-moamoa-500"
          >
            {keyword}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="body-2 flex items-center text-black">
          <span>예상 소요 시간 :</span>
          <span className="ml-3">{minute}분</span>
        </div>
        <div className="body-5 flex items-center text-black">
          <span>카테고리 :</span>
          <span className="ml-3">{category}</span>
        </div>
        <p className="body-5 truncate text-black">{description}</p>
      </div>
    </div>
  );
}
