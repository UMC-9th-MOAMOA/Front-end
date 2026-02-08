import { useEffect, useMemo, useRef, useState } from "react";
import IcSadSquirrel from "@/assets/icons/ic_sadsquirrel.svg?react";
import { mockDoneMissions, mockLikedMissions } from "../../mocks/mypage.mock";
import type { MissionItem, MissionSubTabKey } from "../../types/mypage.type";
import MissionFilters from "../filters/MissionFilters";
import MissionCard from "./MissionCard";
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

  const [likedList, setLikedList] = useState<MissionItem[]>(mockLikedMissions);
  const doneList = mockDoneMissions;

  const loadSize = 6;
  const [visibleCount, setVisibleCount] = useState(loadSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const baseList = subTab === "liked" ? likedList : doneList;
  const actionLabel = subTab === "liked" ? "시작하기" : "자세히 보기";

  const list = useMemo(() => {
    let copied = [...baseList];

    if (category !== "all") {
      copied = copied.filter((m) => m.category === category);
    }

    if (timeSort === "short")
      copied.sort((a, b) => a.expectedMinutes - b.expectedMinutes);
    if (timeSort === "long")
      copied.sort((a, b) => b.expectedMinutes - a.expectedMinutes);
    if (timeSort === "recent") {
    }

    return copied;
  }, [baseList, timeSort, category]);

  useEffect(() => {
    setVisibleCount(loadSize);
  }, [list.length, loadSize]);

  const visibleList = list.slice(0, visibleCount);
  const hasMore = visibleCount < list.length;

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + loadSize, list.length));
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, list.length, loadSize]);

  const toggleLike = (id: string) => {
    setLikedList((prev) =>
      prev
        .map((m) => (m.id === id ? { ...m, liked: !m.liked } : m))
        .filter((m) => m.liked)
    );
  };

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

      <div className="-mx-25 w-full">
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

            <div className="flex w-full flex-col gap-16">
              {list.length === 0 ? (
                <div className="mt-105 flex w-full flex-col items-center gap-4">
                  <p className="heading-5 text-gray-500">
                    이용 내역이 없습니다
                  </p>
                  <IcSadSquirrel aria-hidden />
                </div>
              ) : (
                visibleList.map((m) => (
                  <MissionCard
                    key={m.id}
                    item={m}
                    keywords={["키워드", "키워드", "키워드"]}
                    onToggleLike={toggleLike}
                    onClickDetail={goDetail}
                    actionLabel={actionLabel}
                    disableLike={subTab === "done"}
                  />
                ))
              )}
              {hasMore && <div ref={sentinelRef} className="h-1 w-full" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
