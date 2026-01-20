import { useMemo, useState } from "react";
import { mockDoneMissions, mockLikedMissions } from "../../mocks/mypage.mock";
import type { MissionItem, MissionSubTabKey } from "../../types/mypage.type";
import MissionFilters from "../filters/MissionFilters";
import MissionTabs from "../MissionTabs";
import MissionCard from "./MissionCard";
import MissionPagination from "./MissionPagination";
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

      <div className="relative -mx-25 mt-16 inline-flex h-1416 w-375 flex-col items-center gap-9 rounded-xl bg-[var(--color-white)] px-25 pt-17 pb-193">
        <div className="w-325">
          <MissionFilters
            timeSort={timeSort}
            category={category}
            onChangeTime={setTimeSort}
            onChangeCategory={setCategory}
          />

          <div className="flex flex-col gap-16">
            {list.length === 0 ? (
              <div className="rounded-[16px] bg-white px-[20px] py-[24px] text-center text-[#98A2B3] text-[14px] leading-[18px] shadow-sm">
                {subTab === "liked"
                  ? "찜한 미션이 없어요"
                  : "완료한 미션이 없어요"}
              </div>
            ) : (
              list.map((m) => (
                <MissionCard
                  key={m.id}
                  item={m}
                  keywords={["키워드", "키워드", "키워드"]} // TODO: API 연결 시 m.keywords로 교체
                  onToggleLike={toggleLike}
                  onClickDetail={goDetail}
                />
              ))
            )}
          </div>
        </div>
        <MissionPagination onPageClick={(n) => console.log("page:", n)} />
      </div>
    </section>
  );
}
