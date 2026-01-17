import { useMemo, useState } from "react";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";

import type {
  AcornHistoryFilterKey,
  AcornHistoryItem,
  AcornHistorySortKey,
} from "../types/mypage.type";

export default function AcornHistory({ items }: { items: AcornHistoryItem[] }) {
  const [filter, setFilter] = useState<AcornHistoryFilterKey>("all");
  const [sortKey, setSortKey] = useState<AcornHistorySortKey>("recent");

  const filtered = useMemo(() => {
    let base = items;

    if (filter === "progress")
      base = base.filter((x) => x.status === "progress");
    if (filter === "done") base = base.filter((x) => x.status === "done");

    const copied = [...base];

    if (sortKey === "recent") {
      // "YYYY-MM-DD" 문자열은 기본적으로 내림차순 정렬 가능
      copied.sort((a, b) => b.date.localeCompare(a.date));
    }

    return copied;
  }, [items, filter, sortKey]);

  return (
    <section className="mt-[22px]">
      <h3 className="h-[25px] w-[190px] font-bold text-gray-700 text-sm">
        도토리 히스토리
      </h3>
      {/* 필터 탭 */}
      <div className="mt-3 flex h-[34px] w-[190px] gap-[8px]">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={[
            "flex h-[34px] w-[58px] items-center justify-center whitespace-nowrap rounded-[8px] px-[17px] py-[8px] font-semibold text-sm",
            filter === "all"
              ? "bg-[#5586F1] text-white"
              : "bg-[#E3EBFD] text-[#5586F1]",
          ].join(" ")}
        >
          전체
        </button>

        <button
          type="button"
          onClick={() => setFilter("progress")}
          className={[
            "flex h-[34px] w-[58px] items-center justify-center whitespace-nowrap rounded-[8px] px-[17px] py-[8px] font-semibold text-sm",
            filter === "progress"
              ? "bg-[#5586F1] text-white"
              : "bg-[#E3EBFD] text-[#5586F1]",
          ].join(" ")}
        >
          적립
        </button>

        <button
          type="button"
          onClick={() => setFilter("done")}
          className={[
            "flex h-[34px] w-[58px] items-center justify-center whitespace-nowrap rounded-[8px] px-[17px] py-[8px] font-semibold text-sm",
            filter === "done"
              ? "bg-[#5586F1] text-white"
              : "bg-[#E3EBFD] text-[#5586F1]",
          ].join(" ")}
        >
          성공
        </button>
      </div>

      <div className="mt-[14px] flex h-[586px] w-[324px] flex-col overflow-hidden rounded-[16px] bg-white shadow-sm">
        {/* 정렬 (카드 안, 고정) */}
        <div className="relative h-[48px]">
          {/* 최신순 */}
          <button
            type="button"
            onClick={() => setSortKey("recent")}
            className="absolute top-[11px] left-[13px] flex h-[26px] w-[73px] items-center rounded-[8px] bg-[#EEE] px-[8px] py-[4px] text-[#5586F1]"
          >
            <span className="h-[18px] w-[36px] whitespace-nowrap text-sm">
              최근순
            </span>
            <span className="ml-[5px]">
              <IcDropdown className="h-[16px] w-[16px]" />
            </span>
          </button>

          {/* 완료미션 */}
          <button
            type="button"
            onClick={() => setSortKey("doneMission")}
            className="absolute top-[11px] left-[98px] flex h-[26px] w-[88px] items-center rounded-[8px] bg-[#EEE] px-[8px] py-[4px] text-[#5586F1]"
          >
            <span className="h-[18px] w-[51px] whitespace-nowrap text-sm">
              완료 미션
            </span>
            <span className="ml-[5px]">
              <IcDropdown className="h-[16px] w-[16px]" />
            </span>
          </button>
        </div>

        {/* 리스트 (카드 안, 스크롤) */}
        <div className="mt-[9px] flex-1 overflow-y-auto px-[8px] pr-[9px]">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              도토리 내역이 없어요.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((item) => {
                const [yy, mm, dd] = item.date.split("-");
                return (
                  <li key={item.id} className="px-5 py-4">
                    <div className="h-[82px] w-[273px] px-[17px] py-[12px]">
                      <div className="flex items-center">
                        <span className="h-[21px] w-[38px]">{yy}</span>
                        <span className="mx-[4px] h-[21px]">-</span>
                        <span className="h-[21px] w-[17px]">{mm}</span>
                        <span className="mx-[4px] h-[21px]">-</span>
                        <span className="h-[21px] w-[19px]">{dd}</span>
                      </div>
                      <div className="mt-[0px] flex h-[40px] w-[273px] items-center">
                        {/* 미션 이름 (158x25, 왼쪽 여백 없음) */}
                        <div className="h-[25px] w-[158px] truncate">
                          {item.missionTitle}
                        </div>

                        {/* 미션 이름 오른쪽 여백 42 */}
                        <div className="w-[42px]" />

                        {/* + 아이콘 */}
                        <IcPlus className="h-[16px] w-[16px]" aria-hidden />

                        {/* 간격 4 */}
                        <div className="w-[4px]" />

                        {/* 도토리 개수 */}
                        <span>{Math.abs(item.acornDelta)}</span>

                        {/* 간격 4 */}
                        <div className="w-[4px]" />

                        {/* 도토리 아이콘 (29x40) */}
                        <IcAcorn className="h-[40px] w-[29px]" aria-hidden />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      {/* 많은 데이터 대비(나중에 API 붙일 때) */}
      <div className="mt-2 text-gray-400 text-xs">
        {/* TODO(API 연결 시): 페이지네이션/무한스크롤로 교체 */}
      </div>
    </section>
  );
}
