import IcLock from "@/assets/icons/ic_lock.svg?react";
import IcAcorn from "@/assets/icons/mission/ic_colored_acorn.svg?react";

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
    // 콘텐츠 링크로 이동
    window.open(contentUrl, "_blank", "noopener,noreferrer");
    onContentClick?.();
  };

  return (
    <div className="flex h-638 w-333 flex-col gap-12 rounded-xl bg-white px-24 pt-21">
      {/* 미션 이름 */}
      <div className="flex items-center gap-10">
        <h2 className="heading-3 text-black">미션 이름</h2>
      </div>

      {/* 키워드 */}
      <div className="flex gap-4">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="body-4 flex items-center justify-center rounded-lg bg-moamoa-50 px-17 py-8 text-moamoa-500"
          >
            {keyword}
          </div>
        ))}
      </div>

      {/* 예상 소요시간 & 카테고리 */}
      <div className="body-4 flex items-center justify-between pt-4 text-black">
        <span>예상 소요시간 : {organization}</span>
        <span>{category}</span>
      </div>

      {/* 썸네일 */}
      <div className="flex h-152 items-center justify-center rounded-xl bg-gray-200">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="콘텐츠 썸네일"
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <span className="body-2 text-gray-500">콘텐츠 썸네일</span>
        )}
      </div>

      {/* 콘텐츠 보러가기 버튼 */}
      <button
        type="button"
        onClick={handleContentClick}
        className="flex h-45 items-center justify-center gap-14 rounded-xl bg-moamoa-50"
      >
        <span className="heading-5 text-moamoa-400">콘텐츠 보러가기</span>
        <svg
          width="17"
          height="24"
          viewBox="0 0 17 24"
          fill="none"
          className="text-moamoa-200"
        >
          <path
            d="M2 2L15 12L2 22V2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      {/* 장식 구분선과 동그라미 */}
      <div className="relative flex w-full items-center justify-center pt-30">
        {/* 구분선 (10개 요소) */}
        <div className="flex w-261 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="h-4 w-22 rounded-md bg-moamoa-50" />
          ))}
        </div>
        <div className="absolute right-294 h-54 w-54 rounded-full bg-[#FCFCFC]" />
        <div className="absolute left-294 h-54 w-54 rounded-full bg-[#FCFCFC]" />
      </div>

      {/* 퀴즈 잠금 섹션 프레임 */}
      <div className="flex h-104 w-238 flex-col items-center gap-16 self-center pt-36">
        {/* 빨간 배경 텍스트 */}
        <span
          className={`heading-6 flex h-24 items-center justify-center ${
            isContentWatched ? "text-moamoa-500" : "w-208 text-red-400"
          }`}
        >
          {isContentWatched ? (
            <div className="flex items-center justify-center">
              <span className="heading-6 px-4 text-moamoa-500">
                지금 퀴즈 도전하고
              </span>
              <IcAcorn className="h-30 w-30" />
              <span className="heading-6 text-moamoa-500">도토리 받기</span>
            </div>
          ) : (
            <span className="heading-6 flex h-24 w-208 items-center justify-center text-red-400">
              콘텐츠를 시청해야 퀴즈가 열려요 !
            </span>
          )}
        </span>
        {/* 퀴즈 도전 버튼 - 상태에 따라 변경 */}
        {isContentWatched ? (
          // 파란색 버튼 (시청 완료)
          <button
            type="button"
            onClick={onQuizStart}
            className="flex h-64 w-238 items-center justify-center gap-4 rounded-xl bg-moamoa-100 px-76 py-26"
          >
            <span className="heading-3 text-center text-moamoa-500">
              퀴즈 도전 !
            </span>
          </button>
        ) : (
          // 회색 박스 (시청 전)
          <div className="relative flex h-64 w-238 items-center justify-center gap-4 rounded-xl bg-gray-300 px-76 py-26">
            <span className="heading-3 h-28 w-83 text-center text-gray-400">
              퀴즈 도전 !
            </span>
            {/* 자물쇠 아이콘 (위에 표시) */}
            <div className="absolute flex h-40 w-40 items-center justify-center">
              <IcLock className="h-40 w-40 text-gray-700" />
            </div>
          </div>
        )}

        {/* 안내 텍스트 - 상태에 따라 변경 */}
        <p className="body-4 h-18 w-236 pt-24 text-center text-gray-600">
          {isContentWatched
            ? "퀴즈 풀 준비 됐나요?"
            : "시청 후 퀴즈를 풀면 도토리를 받을 수 있어요"}
        </p>
      </div>
    </div>
  );
}
