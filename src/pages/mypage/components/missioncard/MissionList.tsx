import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcSadSquirrel from "@/assets/icons/ic_sadsquirrel.svg?react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import MissionCard from "@/components/MissionCard";
import { CATEGORY_ID_MAP } from "@/constants/missions/categories";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useScrapMission } from "@/hooks/useScrapMission";
import { useMyMissionsInfinite } from "../../hooks/useMyMissionsInfinite";
import type {
  MissionCategory,
  MissionItem,
  MissionSubTabKey,
} from "../../types/mypage.type";
import MissionFilters from "../filters/MissionFilters";
import MissionTabs from "./MissionTabs";

import type {
  MissionCategoryFilter,
  MissionTimeSort,
} from "./missionList.types";

export default function MissionTab() {
  const [subTab, setSubTab] = useState<MissionSubTabKey>("liked");
  const [doneView, setDoneView] = useState<"done" | "retry">("done");

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
  const list: MissionItem[] = visibleMissions.map((m) => ({
    id: String(m.missionId),
    title: m.title,
    expectedMinutes: m.durationMinutes,
    category: m.category as MissionCategory,
    quizType: "OX",
    liked: m.isScrapped,
    done: subTab === "done",
  }));

  const actionLabel =
    subTab === "liked"
      ? "시작하기"
      : doneView === "retry"
        ? "다시 풀기"
        : "자세히 보기";
  const hideHeart = subTab !== "liked";

  const navigate = useNavigate();

  const goDetail = (id: string) => {
    console.log("detail:", id);
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
            list.length === 0 ? "bg-[#E6E6E6]" : "bg-white",
          ].join(" ")}
        >
          <div className="flex w-full flex-col gap-4 px-25">
            <MissionFilters
              timeSort={timeSort}
              category={category}
              onChangeTime={setTimeSort}
              onChangeCategory={setCategory}
              isEmpty={list.length === 0}
            />

            <div className="flex w-full flex-col gap-16 pb-30">
              {list.length === 0 ? (
                <div className="mt-105 flex w-full flex-col items-center gap-4">
                  <p className="heading-5 text-gray-500">
                    이용 내역이 없습니다
                  </p>
                  <IcSadSquirrel aria-hidden />
                </div>
              ) : (
                list.map((m) => {
                  const found = visibleMissions.find(
                    (mission) => String(mission.missionId) === m.id
                  );
                  const keywords =
                    found?.keywords && found.keywords.length > 0
                      ? found.keywords
                      : ["키워드", "키워드", "키워드"];

                  const handleAction = () => {
                    if (!found) return;
                    if (subTab === "liked") {
                      goDetail(m.id);
                      return;
                    }
                    navigate(`/mypage/mission/${found.missionId}`, {
                      state: {
                        title: found.title,
                        keywords: found.keywords,
                        minute: found.durationMinutes,
                        category: found.category,
                        videoUrl: found.videoUrl,
                      },
                    });
                  };

                  return (
                    <MissionCard
                      key={m.id}
                      id={Number(m.id)}
                      title={m.title}
                      keywords={keywords}
                      minute={m.expectedMinutes}
                      category={m.category}
                      quizCount={found?.quizCount ?? 0}
                      isScrapped={m.liked}
                      actionLabel={actionLabel}
                      hideHeart={hideHeart}
                      onHeartClick={() => {
                        if (!found) return;
                        scrapMutation.mutate({
                          missionId: found.missionId,
                          isScrapped: found.isScrapped,
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
