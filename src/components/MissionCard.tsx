import { useNavigate } from "react-router-dom";
import IcHeart from "@/assets/icons/ic_heart.svg?react";
import { Button } from "@/components/common/button/Button";
import { cn } from "@/utils/cn/cn";

interface MissionCardProps {
  id: number;
  title: string;
  keywords: string[];
  minute: number;
  category: string;
  quizCount: number;
  isScrapped: boolean;
  onHeartClick?: () => void;
  onStartClick?: () => void;
  actionLabel?: string;
  hideHeart?: boolean;

}

export default function MissionCard({
  id,
  title,
  keywords,
  minute,
  category,
  quizCount,
  isScrapped,
  onHeartClick,
  onStartClick,
  actionLabel = "시작하기",
  hideHeart = false,

}: MissionCardProps) {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate(`/mission/${id}`);
  };
  return (
    <div className="relative rounded-xl border border-moamoa-50 bg-white px-20 py-24 shadow-[0_0_16.9px_0_rgba(0,0,0,0.10)]">
      <div className="flex items-start gap-26">
        <h3 className="heading-3 w-full truncate">{title}</h3>
        {!hideHeart && (
          <button type="button" onClick={onHeartClick} className="shrink-0">
            <IcHeart
              className={cn(
                "size-24 shrink-0 cursor-pointer text-moamoa-200",
                isScrapped && "fill-moamoa-100",
              )}
            />
          </button>
        )}

      </div>

      <div className="-mx-20 mt-12 overflow-x-auto">
        <div className="flex gap-4 px-20">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="body-4 shrink-0 rounded-sm bg-moamoa-50 px-17 py-8 text-moamoa-500"
            >
              {keyword}
            </span>
          ))}
          <div className="w-20 shrink-0" />
        </div>
      </div>

      <div className="mt-12 flex items-end justify-between">
        <div className="body-2 flex flex-col gap-10">
          <span>예상 소요시간 : {minute}분</span>
          <span>카테고리 : {category}</span>
          <span>퀴즈 개수 : {quizCount}개</span>
        </div>

        <Button
          className="heading-5 w-126 rounded-lg bg-moamoa-50 py-10 text-moamoa-400 active:bg-moamoa-300 active:text-white"
          onClick={handleStartClick}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
