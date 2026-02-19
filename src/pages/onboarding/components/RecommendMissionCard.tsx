import { getYoutubeThumbnail } from "@/utils/youtube";

interface RecommendMissionCardProps {
  title: string;
  category: string;
  durationMinutes: number;
  quizCount: number;
  videoUrl: string;
  isActive: boolean;
  onClick?: () => void;
}

export default function RecommendMissionCard({
  title,
  category,
  durationMinutes,
  quizCount,
  videoUrl,
  isActive,
  onClick,
}: RecommendMissionCardProps) {
  const thumbnailUrl = getYoutubeThumbnail(videoUrl);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className={`flex w-260 cursor-pointer flex-col items-center rounded-xl bg-white px-20 py-40 ${
        isActive ? "opacity-100" : "opacity-50"
      }`}
      style={{
        boxShadow: "0 0 16.9px 0 rgba(0, 0, 0, 0.04)",
      }}
    >
      <h3 className="heading-3 line-clamp-2 w-full text-center text-black">
        {title}
      </h3>

      <div className="mt-22">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-114 w-200 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-114 w-200 items-center justify-center rounded-lg bg-gray-200">
            <span className="body-4 text-gray-400">썸네일</span>
          </div>
        )}
      </div>

      <div className="mt-22 flex w-full flex-col items-center gap-4 rounded-xl bg-gray-100 px-48 py-10.5">
        <span className="body-4 whitespace-nowrap text-black">
          카테고리 : {category}
        </span>
        <span className="body-4 whitespace-nowrap text-black">
          예상 소요 시간 : {durationMinutes}분
        </span>
        <span className="body-4 whitespace-nowrap text-black">
          퀴즈 개수 : {quizCount}개
        </span>
      </div>
    </div>
  );
}
