import IcLock from "@/assets/icons/ic_lock.svg?react";
import IcPolygon from "@/assets/icons/ic_polygon.svg?react";
import IcAcorn from "@/assets/icons/mission/ic_colored_acorn.svg?react";
import { Button } from "@/components/common/button/Button";
import { buttonVariants } from "@/components/common/button/buttonVariants";

interface MissionInfoCardProps {
  organization: string;
  category: string;
  keywords: string[];
  thumbnailUrl: string;
  contentUrl: string;
  isContentWatched?: boolean;
  onContentClick?: () => void;
  onQuizStart?: () => void;
}

export default function MissionInfoCard({
  organization,
  category,
  keywords,
  thumbnailUrl,
  contentUrl,
  isContentWatched = false,
  onContentClick,
  onQuizStart,
}: MissionInfoCardProps) {
  const handleContentClick = () => {
    window.open(contentUrl, "_blank", "noopener,noreferrer");
    onContentClick?.();
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-white px-23 py-21">
      <div className="flex items-center gap-10">
        <h2 className="heading-3 pb-4 text-center text-black">미션 이름</h2>
      </div>
      <div className="flex items-start gap-4 self-stretch pb-8">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="body-4 flex items-center justify-center gap-4 rounded-lg bg-moamoa-50 px-16 py-8 text-center text-moamoa-500"
          >
            {keyword}
          </div>
        ))}
      </div>

      <div className="body-4 flex items-start justify-between self-stretch text-black">
        <span>예상 소요시간 : {organization}</span>
        <span>{category}</span>
      </div>

      <div className="flex h-152 w-full items-center justify-center overflow-hidden rounded-xl bg-black">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="콘텐츠 썸네일"
            className="h-full w-full rounded-xl object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="body-2 text-gray-500">콘텐츠 썸네일</span>
          </div>
        )}
      </div>

      <div className="pt-24">
        <Button
          onClick={handleContentClick}
          className={buttonVariants({ variant: "tertiary", size: "full" })}
          rightIcon={<IcPolygon className="text-moamoa-200" />}
        >
          콘텐츠 보러가기
        </Button>
      </div>

      <div className="relative flex w-full items-center justify-center pt-42">
        <div className="inline-flex w-full gap-4 px-12">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-4 flex-1 items-start rounded-md bg-moamoa-50 px-4 py-4"
            />
          ))}
        </div>
        {/* 양옆 동그라미 추가 */}
      </div>

      <div className="flex w-full flex-col items-center gap-16 self-center px-48 pt-35 pb-80">
        <span
          className={`heading-6 flex text-center ${
            isContentWatched ? "text-moamoa-500" : "w-208 text-red-400"
          }`}
        >
          {isContentWatched ? (
            <div className="flex items-center justify-center">
              <span className="heading-6 text-moamoa-500">
                지금 퀴즈 도전하고
              </span>
              <IcAcorn className="h-30 w-30" />
              <span className="heading-6 text-moamoa-500">도토리 받기</span>
            </div>
          ) : (
            <span className="heading-6 text-center text-red-400">
              콘텐츠를 시청해야 퀴즈가 열려요 !
            </span>
          )}
        </span>
        {isContentWatched ? (
          <Button
            onClick={onQuizStart}
            className="flex h-64 w-238 items-center justify-center rounded-xl bg-moamoa-100 px-76 py-26"
          >
            <span className="heading-3 text-center text-moamoa-500">
              퀴즈 도전 !
            </span>
          </Button>
        ) : (
          <Button
            disabled
            className="relative flex h-64 w-238 items-center justify-center rounded-xl px-76 py-26"
          >
            <span className="heading-3 text-center text-gray-400">
              퀴즈 도전 !
            </span>
            <div className="absolute flex h-40 w-40 items-center justify-center">
              <IcLock className="h-40 w-40 text-gray-700" />
            </div>
          </Button>
        )}

        <p className="body-4 w-full pt-24 text-center text-gray-600">
          {isContentWatched
            ? "퀴즈 풀 준비 됐나요?"
            : "시청 후 퀴즈를 풀면 도토리를 받을 수 있어요"}
        </p>
      </div>
    </div>
  );
}
