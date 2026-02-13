import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IcSadSquirrel from "@/assets/icons/ic_sadsquirrel.svg?react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import MissionCard from "@/components/MissionCard";
import { CATEGORY_ID_MAP } from "@/constants/missions/categories";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useScrapMission } from "@/hooks/useScrapMission";
import InterestsSuccessModal from "@/pages/settings/components/InterestsSuccessModal";
import { useMyMissionsInfinite } from "../../hooks/useMyMissionsInfinite";
import type {
  MissionCategory,
  MissionSubTabKey,
} from "../../types/mypage.type";
import MissionFilters from "../filters/MissionFilters";
import MissionTabs from "./MissionTabs";

import type {
  MissionCategoryFilter,
  MissionTimeSort,
} from "./missionList.types";

export default function MissionTab() {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const initialDoneView = viewParam === "retry" ? "retry" : "done";
  const initialSubTab = viewParam === "retry" ? "done" : "liked";

  const [subTab, setSubTab] = useState<MissionSubTabKey>(initialSubTab);
  const [doneView, setDoneView] = useState<"done" | "retry">(initialDoneView);
  const [retryModalOpen, setRetryModalOpen] = useState(false);
  const [retryMissionId, setRetryMissionId] = useState<string | null>(null);

  const [timeSort, setTimeSort] = useState<MissionTimeSort>("short");
  const [category, setCategory] = useState<MissionCategoryFilter>("all");

  const status =
    subTab === "liked" ? "SCRAP" : doneView === "done" ? "COMPLETE" : "RETRY";
  const condition =
    timeSort === "short"
      ? "TIME_ASC"
      : timeSort === "long"
        ? "TIME_DESC"
        : "LATEST";
  const categoryId =
    category === "all"
      ? undefined
      : CATEGORY_ID_MAP[category as MissionCategory];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyMissionsInfinite({
      status,
      condition,
      categoryId,
    });

  const scrapMutation = useScrapMission();
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const missions = data.pages.flatMap((page) => page.missions);
  const visibleMissions =
    status === "SCRAP" ? missions.filter((m) => m.isScrapped) : missions;
  const actionLabel =
    subTab === "liked"
      ? "시작하기"
      : doneView === "retry"
        ? "다시 풀기"
        : "자세히 보기";
  const hideHeart = subTab !== "liked";

  const navigate = useNavigate();

  const goDetail = (id: string) => {
    navigate(`/mission/${id}`);
  };

  return (
    <section className="flex w-full flex-col">
      <MissionTabs
        subTab={subTab}
        doneView={doneView}
        onSelect={(nextSubTab, nextDoneView) => {
          setSubTab(nextSubTab);
          setDoneView(nextDoneView);
        }}
      />

      <div className="-mx-25 w-screen">
        <div
          className={[
            "relative flex w-full flex-col gap-6 rounded-t-xl pt-17 shadow-sm",
            "min-h-[62.2dvh]",
            visibleMissions.length === 0 ? "bg-[#E6E6E6]" : "bg-white",
          ].join(" ")}
        >
          <div className="flex w-full flex-col gap-4 px-25">
            <MissionFilters
              timeSort={timeSort}
              category={category}
              onChangeTime={setTimeSort}
              onChangeCategory={setCategory}
              isEmpty={visibleMissions.length === 0}
            />

            <div className="flex w-full flex-col gap-16 pb-30">
              {visibleMissions.length === 0 ? (
                <div className="mt-105 flex w-full flex-col items-center gap-4">
                  <p className="heading-5 text-gray-500">
                    이용 내역이 없습니다
                  </p>
                  <IcSadSquirrel aria-hidden />
                </div>
              ) : (
                visibleMissions.map((mission) => {
                  const keywords =
                    mission.keywords && mission.keywords.length > 0
                      ? mission.keywords
                      : ["키워드", "키워드", "키워드"];

                  const handleAction = () => {
                    if (subTab === "liked") {
                      goDetail(String(mission.missionId));
                      return;
                    }
                    if (doneView === "retry") {
                      setRetryMissionId(String(mission.missionId));
                      setRetryModalOpen(true);
                      return;
                    }
                    navigate(`/mypage/mission/${mission.missionId}`, {
                      state: {
                        title: mission.title,
                        keywords: mission.keywords,
                        minute: mission.durationMinutes,
                        category: mission.category,
                        videoUrl: mission.videoUrl,
                      },
                    });
                  };

                  return (
                    <MissionCard
                      key={mission.missionId}
                      id={mission.missionId}
                      title={mission.title}
                      keywords={keywords}
                      minute={mission.durationMinutes}
                      category={mission.category as MissionCategory}
                      quizCount={mission.quizCount ?? 0}
                      isScrapped={mission.isScrapped}
                      actionLabel={actionLabel}
                      hideHeart={hideHeart}
                      onHeartClick={() => {
                        scrapMutation.mutate({
                          missionId: mission.missionId,
                          isScrapped: mission.isScrapped,
                        });
                      }}
                      onStartClick={handleAction}
                    />
                  );
                })
              )}
              {hasNextPage && (
                <div ref={ref} className="flex justify-center py-20">
                  {isFetchingNextPage && <LoadingSpinner className="size-40" />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <InterestsSuccessModal
        open={retryModalOpen}
        onConfirm={() => {
          if (retryMissionId) {
            goDetail(retryMissionId);
          }
          setRetryModalOpen(false);
          setRetryMissionId(null);
        }}
        titleClassName="heading-4 text-center text-black"
        title={
          <>
            다시 풀 때는
            <br />
            도토리가 지급되지 않아요.
          </>
        }
        description={<>그래도 진행하시겠어요?</>}
        confirmText="다시 풀기"
        secondaryText="아니요"
        onSecondary={() => {
          setRetryModalOpen(false);
          setRetryMissionId(null);
        }}
      />
    </section>
  );
}
