import { useNavigate } from "react-router-dom";
import IcCircleLeftArrow from "@/assets/icons/ic_circle_left_arrow.svg?react";
import IcReload from "@/assets/icons/ic_reload.svg?react";
import AsyncBoundary from "@/components/AsyncBoundary";
import { Button } from "@/components/common/button/Button";
import { useRecommendedMissions } from "@/pages/search/hooks/useQuery/useRecommendedMissions";
import RecommendMissionCard from "./components/RecommendMissionCard";
import { useCarouselDrag } from "./hooks/useCarouselDrag";

const CARD_GAP = 280;

export default function OnboardingRecommend() {
  return (
    <AsyncBoundary>
      <OnboardingRecommendContent />
    </AsyncBoundary>
  );
}

function OnboardingRecommendContent() {
  const navigate = useNavigate();

  const { data: missions, refetch } = useRecommendedMissions({ time: null });
  const { activeIndex, dragX, isDragging, bind } = useCarouselDrag({
    totalItems: missions.length,
  });

  if (missions.length === 0) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="body-2 text-gray-400">추천 미션이 없습니다</p>
      </section>
    );
  }

  return (
    <section className="mt-18 flex flex-1 flex-col pb-120">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => navigate("/onboarding")}
        className="flex h-33 w-33 items-center justify-center"
      >
        <IcCircleLeftArrow className="h-33 w-33" />
      </button>

      <h2 className="heading-2 mt-11 self-center whitespace-pre-line text-center text-black">
        {"당신에게 적합한\n미션 리스트입니다 !"}
      </h2>

      <div
        className="relative -mx-layout-side mt-49 h-500 overflow-hidden"
        {...bind()}
        style={{ touchAction: "pan-y" }}
      >
        {[-1, 0, 1].map((offset) => {
          const index =
            (activeIndex + offset + missions.length) % missions.length;
          const mission = missions[index];
          const isActive = offset === 0;
          const currentX = offset * CARD_GAP + dragX;

          return (
            <div
              key={offset}
              className="absolute"
              style={{
                top: 20,
                left: `calc(50% + ${currentX}px)`,
                transform: `translateX(-50%) scale(${isActive ? 1 : 0.9})`,
                zIndex: isActive ? 10 : 5,
                transition: isDragging
                  ? "none"
                  : "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <RecommendMissionCard
                title={mission.title}
                category={mission.category}
                durationMinutes={mission.durationMinutes}
                quizCount={mission.quizCount}
                videoUrl={mission.videoUrl}
                isActive={isActive}
                onClick={() => navigate(`/mission/${mission.missionId}`)}
              />
            </div>
          );
        })}

        <button
          type="button"
          className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer items-center gap-6 rounded-2xl bg-moamoa-50 px-16 py-8"
          onClick={() => refetch()}
        >
          <IcReload className="size-19 text-moamoa-400" />
          <span className="body-2 text-moamoa-600">새로고침</span>
        </button>
      </div>

      <div className="sticky bottom-0 z-30 mt-40 w-full bg-white">
        <Button
          type="button"
          className="heading-5 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
          onClick={() => navigate("/home")}
        >
          계속하기
        </Button>
      </div>
    </section>
  );
}
