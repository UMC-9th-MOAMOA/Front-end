import IcLock from "@/assets/icons/ic_lock.svg?react";
import IcPolygon from "@/assets/icons/ic_polygon.svg?react";
import IcAcorn from "@/assets/icons/mission/ic_colored_acorn.svg?react";
import { Button } from "@/components/common/button/Button";
import { buttonVariants } from "@/components/common/button/buttonVariants";

interface MissionInfoCardProps {
  title: string;
  interest: string;
  keyword: string[];
  durationMinutes: number;
  videoUrl: string;
  isContentWatched: boolean;
  attemptCount: number;
  onContentClick: () => void;
  onQuizStart: () => void;
}

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function MissionInfoCard({
  title,
  interest,
  keyword,
  durationMinutes,
  videoUrl,
  isContentWatched,
  attemptCount,
  onContentClick,
  onQuizStart,
}: MissionInfoCardProps) {
  // attemptCount > 0이면 "다시 풀기", 아니면 "퀴즈 도전 !"
  const buttonText = attemptCount > 0 ? "다시 풀기" : "퀴즈 도전 !";
  const thumbnailUrl = getYoutubeThumbnail(videoUrl);

  const handleContentClick = () => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
    onContentClick();
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-white px-23 py-21">
      <div className="flex items-center gap-10">
        <h2 className="heading-3 pb-4 text-center text-black">{title}</h2>
      </div>
      <div className="flex items-start gap-4 self-stretch pb-8">
        {keyword.map((kw, index) => (
          <div
            key={index}
            className="body-4 flex items-center justify-center gap-4 rounded-lg bg-moamoa-50 px-16 py-8 text-center text-moamoa-500"
          >
            {kw}
          </div>
        ))}
      </div>

      <div className="body-4 flex items-start justify-between self-stretch text-black">
        <span>예상 소요시간 : {durationMinutes}분</span>
        <span>{interest}</span>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="콘텐츠 썸네일"
            className="h-full w-full rounded-xl object-cover"
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
      </div>

      <div className="flex w-full flex-col items-center gap-16 self-center px-48 pt-35 pb-32">
        <span
          className={`heading-6 flex text-center ${
            isContentWatched ? "text-moamoa-500" : "w-208 text-red-400"
          }`}
        >
          {isContentWatched ? (
            <div className="flex flex-wrap items-center justify-center">
              <span className="heading-6 whitespace-nowrap text-moamoa-500">
                지금 퀴즈 도전하고
              </span>
              <span className="flex items-center whitespace-nowrap">
                <IcAcorn className="h-30 w-30 shrink-0" />
                <span className="heading-6 text-moamoa-500">도토리 받기</span>
              </span>
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
              {buttonText}
            </span>
          </Button>
        ) : (
          <Button
            disabled
            className="relative flex h-64 w-238 items-center justify-center rounded-xl px-76 py-26"
          >
            <span className="heading-3 text-center text-gray-400">
              {buttonText}
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
