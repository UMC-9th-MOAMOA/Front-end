import { useMemo, useState } from "react";
import IcCalendar from "@/assets/icons/ic_calendar.svg?react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import IcHeartEmpty from "@/assets/icons/ic_heart.svg?react";
import IcHeartFilled from "@/assets/icons/ic_heart2.svg?react";
import IcLikeButton from "@/assets/icons/ic_likebutton.svg?react";
import IcNoLikeButton from "@/assets/icons/ic_nolikebutton.svg?react";
import { mockDoneMissions, mockLikedMissions } from "../mocks/mypage.mock";
import type { MissionItem, MissionSubTabKey } from "../types/mypage.type";

type TimeSort = "recent" | "short" | "long";

import type { MissionCategory } from "../types/mypage.type";

type CategoryFilter = "all" | MissionCategory;

function HeartIcon({ filled }: { filled: boolean }) {
  const Icon = filled ? IcHeartFilled : IcHeartEmpty;

  return (
    <Icon
      className={[
        "h-[24px] w-[24px]",
        filled ? "text-[#5586F1]" : "text-[#C9D2E3]", // 비활성 색은 피그마 값으로 교체
      ].join(" ")}
      aria-hidden
    />
  );
}
function MissionCard({
  item,
  keywords,
  quizCount,
  onToggleLike,
  onClickDetail,
}: {
  item: MissionItem;
  keywords: string[];
  quizCount: number; // API 연결 대비
  onToggleLike: (id: string) => void;
  onClickDetail: (id: string) => void;
}) {
  const displayKeywords =
    keywords.length > 0 ? keywords.slice(0, 3) : ["키워드", "키워드", "키워드"];

  return (
    <article
      className="box-border w-[285px] rounded-[16px] bg-white px-[20px] py-[24px]"
      style={{
        border: "1px solid #E3EBFD",
        boxShadow: "0 0 16.9px rgba(0,0,0,0.10)",
      }}
    >
      {/* 제목 + 하트 */}
      <div className="flex h-[28px] w-full items-center">
        <h3 className="h-[28px] w-[236px] overflow-hidden text-ellipsis whitespace-nowrap font-bold text-[16px] text-black leading-[28px]">
          {item.title}
        </h3>

        <div className="w-[26px]" />

        <button
          type="button"
          aria-label="찜 토글"
          onClick={() => onToggleLike(item.id)}
          className="h-[24px] w-[24px]"
        >
          <HeartIcon filled={item.liked} />
        </button>
      </div>

      {/* 키워드 박스 (아래 15px) */}
      <div className="mt-[15px] flex gap-[4px]">
        {displayKeywords.map((k, idx) => (
          <div
            key={`${k}-${idx}`}
            className="flex h-[34px] w-[70px] items-center justify-center rounded-[12px] bg-[#E3EBFD] text-[12px] text-black leading-[34px]"
          >
            {k}
          </div>
        ))}
      </div>

      {/* 키워드 아래 12px 떨어진 285x83 영역 */}
      <div className="mt-[12px] flex w-full">
        {/* 왼쪽 133x83 */}
        <div className="h-[83px] w-[133px]">
          {/* 예상 시간 */}
          <div className="flex items-center text-[#667085] text-[14px] leading-[21px]">
            <span className="w-[86px] whitespace-nowrap">예상 소요시간</span>
            <span className="mx-[6px] whitespace-nowrap">:</span>
            <span className="whitespace-nowrap">{item.expectedMinutes}</span>
            <span className="ml-[2px] whitespace-nowrap">분</span>
          </div>

          {/* 카테고리 */}
          <div className="mt-[10px] flex items-center text-[#667085] text-[14px] leading-[21px]">
            <span className="w-[55px] whitespace-nowrap">카테고리</span>
            <span className="mx-[6px] whitespace-nowrap">:</span>
            <span className="whitespace-nowrap">{item.category}</span>
          </div>

          {/* 퀴즈 개수 (API 붙으면 count로 교체) */}
          <div className="mt-[10px] flex items-center text-[#667085] text-[14px] leading-[21px]">
            <span className="w-[59px] whitespace-nowrap">퀴즈 개수</span>
            <span className="mx-[6px] whitespace-nowrap">:</span>
            <span className="whitespace-nowrap">3개</span>
          </div>
        </div>

        {/* 간격 26px (고정) */}
        <div className="w-[26px]" />

        {/* 오른쪽: 버튼은 285x83 박스의 오른쪽 아래 */}
        <div className="flex h-[83px] flex-1 items-end justify-end">
          <button
            type="button"
            onClick={() => onClickDetail(item.id)}
            className="flex h-[44px] w-[126px] items-center justify-center gap-[4px] whitespace-nowrap rounded-[12px] bg-[#EEF4FF] px-[16px] py-[10px] font-semibold text-[#2E5FEA] text-[14px] leading-[18px]"
          >
            자세히 보기
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MissionTab() {
  const [subTab, setSubTab] = useState<MissionSubTabKey>("liked");
  const [selectedDate] = useState("2026-01-20"); // 임시 고정값
  const [doneView, setDoneView] = useState<"done" | "retry">("done");
  const isLikedTab = subTab === "liked";
  const isDoneTab = subTab === "done";
  const isRetryView = doneView === "retry";

  const [timeSort, setTimeSort] = useState<TimeSort>("short");
  const [category, setCategory] = useState<CategoryFilter>("all");

  // 드롭다운 열림 상태(서로 배타적으로 운영)
  const [openMenu, setOpenMenu] = useState<null | "time" | "category">(null);

  // TODO(API 연결 시): liked/done 목록을 query로 가져오고, 아래는 selector로 대체
  const [likedList, setLikedList] = useState<MissionItem[]>(mockLikedMissions);
  const doneList = mockDoneMissions;

  const baseList = subTab === "liked" ? likedList : doneList;

  const list = useMemo(() => {
    let copied = [...baseList];

    // 1) category 필터 (all이면 필터 없음)
    if (category !== "all") {
      copied = copied.filter((m) => m.category === category);
    }

    // 2) time 정렬
    if (timeSort === "short")
      copied.sort((a, b) => a.expectedMinutes - b.expectedMinutes);
    if (timeSort === "long")
      copied.sort((a, b) => b.expectedMinutes - a.expectedMinutes);
    if (timeSort === "recent") {
      // TODO(API 연결 시): createdAt 같은 필드 기준으로 교체
      // 지금은 mock에 날짜/정렬키 없으면 일단 유지하거나 id 기준으로 임시 처리
    }

    return copied;
  }, [baseList, timeSort, category]);

  const toggleLike = (id: string) => {
    // TODO(API 연결 시): POST/DELETE like 호출 후 invalidate
    setLikedList(
      (prev) =>
        prev
          .map((m) => (m.id === id ? { ...m, liked: !m.liked } : m))
          .filter((m) => m.liked) // 찜한 목록 탭에서는 "찜 해제"하면 리스트에서 빠지는 UX가 자연스러움
    );
  };

  const goDetail = (id: string) => {
    // TODO: 라우팅 생기면 navigate(`/missions/${id}`) 같은 걸로 교체
    console.log("detail:", id);
  };
  return (
    <section className="mt-[16px]">
      {/* (NEW) 3-button segment */}
      <div className="mt-[26px]">
        <div className="mx-auto flex h-[40px] w-[324px] rounded-[12px] bg-[#E3EBFD]">
          {/* 1) 찜한 미션 */}
          <button
            type="button"
            onClick={() => {
              setSubTab("liked");
              setDoneView("done");
            }}
            className={[
              "h-[40px] w-[108px] rounded-[12px]",
              "flex items-center justify-center overflow-hidden",
            ].join(" ")}
            aria-label="찜한 미션"
          >
            {isLikedTab ? (
              <IcLikeButton className="block h-[40px] w-[108px]" aria-hidden />
            ) : (
              <IcNoLikeButton
                className="block h-[40px] w-[108px]"
                aria-hidden
              />
            )}
          </button>

          {/* 2) 완료 */}
          <button
            type="button"
            onClick={() => {
              setSubTab("done");
              setDoneView("done");
            }}
            className={[
              "h-[40px] w-[108px] rounded-[12px]",
              "px-[25px] py-[15px]",
              "flex items-center justify-center",
              "font-semibold text-[14px] leading-[10px]",
              isDoneTab && !isRetryView
                ? "bg-[#5586F1] text-white"
                : "bg-transparent text-[#5586F1]",
            ].join(" ")}
          >
            완료
          </button>

          {/* 3) 다시 풀기 */}
          <button
            type="button"
            onClick={() => {
              setSubTab("done");
              setDoneView("retry");
            }}
            className={[
              "h-[40px] w-[108px] rounded-[12px]",
              "px-[25px] py-[15px]",
              "flex items-center justify-center",
              "font-semibold text-[14px] leading-[10px]",
              isRetryView
                ? "bg-[#5586F1] text-white"
                : "bg-transparent text-[#5586F1]",
            ].join(" ")}
          >
            다시 풀기
          </button>
        </div>
      </div>

      {/* (NEW) 큰 흰 박스: 375 x 1416 */}
      <div className="-mx-[25px] mt-[16px] h-[1416px] w-[375px] rounded-[16px] bg-[#FFFFFF] pt-[17px]">
        {/* 콘텐츠 박스: 325 x 550 (좌우 25, 위 17) */}
        <div className="mx-[25px] h-[550px] w-[325px]">
          {/* 정렬 컨트롤: 302 x 28 */}
          <div className="flex h-[28px] w-[302px] items-center justify-between">
            {/* 왼쪽: 소요시간 드롭다운 */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((p) => (p === "time" ? null : "time"))
                }
                className={[
                  "box-border h-[20px] w-[120px] px-[4px] py-[4px]",
                  "flex items-center",
                ].join(" ")}
              >
                <span className="text-[12px] text-black leading-[12px]">
                  {timeSort === "recent"
                    ? "최근 저장 순"
                    : timeSort === "short"
                      ? "소요시간 짧은 순"
                      : "소요시간 긴 순"}
                </span>

                {/* 텍스트 오른쪽 10 간격 후 아이콘 */}
                <span className="ml-[10px]">
                  <IcDropdown
                    className={[
                      "h-[12px] w-[12px]",
                      openMenu === "time" ? "rotate-180" : "",
                    ].join(" ")}
                    aria-hidden
                  />
                </span>
              </button>

              {/* time 드롭다운 메뉴 */}
              {openMenu === "time" && (
                <div className="absolute top-[24px] left-0 w-[160px] rounded-[12px] bg-white shadow-sm">
                  {(
                    [
                      { key: "recent", label: "최근 저장 순" },
                      { key: "short", label: "소요시간 짧은 순" },
                      { key: "long", label: "소요시간 긴 순" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setTimeSort(opt.key);
                        setOpenMenu(null);
                      }}
                      className="w-full px-[12px] py-[10px] text-left text-[12px] leading-[12px]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 오른쪽: Category 드롭다운 */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((p) => (p === "category" ? null : "category"))
                }
                className="box-border flex h-[20px] w-[96px] items-center justify-end"
              >
                <span className="text-[12px] text-black leading-[12px]">
                  {category === "all" ? "Category" : category}
                </span>

                {/* 오른쪽 14 간격 후 아이콘 */}
                <span className="ml-[14px]">
                  <IcDropdown
                    className={[
                      "h-[12px] w-[12px]",
                      openMenu === "category" ? "rotate-180" : "",
                    ].join(" ")}
                    aria-hidden
                  />
                </span>
              </button>

              {/* category 드롭다운 메뉴 */}
              {openMenu === "category" && (
                <div className="absolute top-[24px] right-0 w-[160px] rounded-[12px] bg-white shadow-sm">
                  {(
                    [
                      "all",
                      "경제와 금융",
                      "IT",
                      "영어",
                      "시사",
                      "인문",
                    ] as const
                  ).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCategory(c);
                        setOpenMenu(null);
                      }}
                      className="w-full px-[12px] py-[10px] text-left text-[12px] leading-[12px]"
                    >
                      {c === "all" ? "전체" : c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 리스트: 550 - (정렬 28) - (간격 16) = 506 */}
          <div className="mt-[12px]">
            <div className="flex flex-col gap-[12px] px-[20px]">
              {list.length === 0 ? (
                <div className="rounded-[16px] bg-white px-[20px] py-[24px] text-center text-[#98A2B3] text-[14px] leading-[18px] shadow-sm">
                  {subTab === "liked"
                    ? "찜한 미션이 없어요."
                    : "완료한 미션이 없어요."}
                </div>
              ) : (
                list.map((m) => (
                  <MissionCard
                    key={m.id}
                    item={m}
                    keywords={["키워드1", "키워드2", "키워드3"]} // TODO: API 연결 시 m.keywords로 교체
                    quizCount={3}
                    onToggleLike={toggleLike}
                    onClickDetail={goDetail}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {/* Pagination: 정렬 박스 기준 아래 1226px */}
        <div className="absolute top-[calc(28px+1226px)] left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-[8px]">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className="h-[21px] w-[10px] text-center text-[#667085] text-[14px] leading-[21px]"
                // TODO: 페이지 클릭 핸들러 붙일 거면 여기
                onClick={() => console.log("page:", n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
