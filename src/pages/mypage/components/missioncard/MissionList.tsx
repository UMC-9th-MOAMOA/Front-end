import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IcSadSquirrel from "@/assets/icons/mypage/ic_sadsquirrel.svg?react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import MissionCard from "@/components/MissionCard";
import { CATEGORY_ID_MAP } from "@/constants/missions/categories";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useScrapMission } from "@/hooks/useScrapMission";
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view");

  const subTab: MissionSubTabKey =
    viewParam === "retry" || viewParam === "done" ? "done" : "liked";
  const doneView: "done" | "retry" = viewParam === "retry" ? "retry" : "done";


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

  const goDetail = (id: string) => {
    navigate(`/mission/${id}`);
  };

  const handleTabChange = (
    nextSubTab: MissionSubTabKey,
    nextDoneView: "done" | "retry"
  ) => {
    const params = { tab: "mission" as const };
    if (nextSubTab === "done" && nextDoneView === "retry") {
      setSearchParams({ ...params, view: "retry" });
      return;
    }
    if (nextSubTab === "done") {
      setSearchParams({ ...params, view: "done" });
      return;
    }
    setSearchParams(params);
  };

  return (
    <section className="flex w-full flex-col">
      <MissionTabs
        subTab={subTab}
        doneView={doneView}
        onSelect={handleTabChange}
      />

      <div className="-mx-layout-side w-screen">
        <div
          className={[
            "relative flex w-full flex-col gap-6 rounded-t-xl pt-17 shadow-sm",
            "min-h-[62.2dvh]",
            visibleMissions.length === 0 ? "bg-[#E6E6E6]" : "bg-white",
          ].join(" ")}
        >
          <div className="flex w-full flex-col gap-4 px-layout-side">
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
                      : [];

                  const handleAction = () => {
                    if (subTab === "liked") {
                      goDetail(String(mission.missionId));
                      return;
                    }
                    if (doneView === "retry") {
                      goDetail(String(mission.missionId));
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

    </section>
  );
}
