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
    <section className="mt-[16px]">
      {/* (NEW) 3-button segment */}
      <MissionTabs
        subTab={subTab}
        doneView={doneView}
        onSelect={(nextSubTab, nextDoneView) => {
          setSubTab(nextSubTab);
          setDoneView(nextDoneView);
        }}
      />

      <div
        className={[
          "relative -mx-25 mt-16 inline-flex h-auto w-375 flex-col items-center gap-9 rounded-xl px-25 pt-17 pb-24",
          list.length === 0 ? "bg-[#E6E6E6]" : "bg-[var(--color-white)]",
        ].join(" ")}
      >
        <div className="w-325">
          <MissionFilters
            timeSort={timeSort}
            category={category}
            onChangeTime={setTimeSort}
            onChangeCategory={setCategory}
          />

          <div className="flex flex-col gap-16">
            {list.length === 0 ? (
              <div className="flex h-559 w-full flex-col items-center">
                <p className="heading-5 mt-[105px] text-[var(--color-gray-500)]">
                  이용 내역이 없어요{" "}
                </p>

                <IcSadSquirrel className="mt-16 ml-82 self-start" aria-hidden />
              </div>
            ) : (
              visibleList.map((m) => (
                <MissionCard
                  key={m.id}
                  item={m}
                  keywords={["키워드", "키워드", "키워드"]}
                  onToggleLike={toggleLike}
                  onClickDetail={goDetail}
                />
              ))
            )}
            {hasMore && <div ref={sentinelRef} className="h-1 w-full" />}
          </div>
        </div>
      </div>
    </section>
  );
}
