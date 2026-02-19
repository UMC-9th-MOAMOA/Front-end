import { useEffect, useRef, useState } from "react";
import IcCheck from "@/assets/icons/ic_check.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcReply from "@/assets/icons/settings/inquiry/ic_reply.svg?react";

import type {
  InquiryAnswerStatusServer,
  InquiryCategoryServer,
  InquiryPeriodServer,
  MyInquiryListItemApi,
} from "@/types/inquiry/inquiry";
import type { AnswerStatus } from "../../types/inquiry.type";
import { useMyInquiries } from "./hooks/useMyInquiries";
import StatusPill from "./StatusPill";

const CATEGORY_OPTIONS = [
  { value: "전체", label: "전체" },
  { value: "보상", label: "보상" },
  { value: "미션 및 퀴즈", label: "미션/퀴즈" },
  { value: "상점 및 꾸미기", label: "상점/꾸미기" },
  { value: "계정", label: "계정" },
  { value: "기타", label: "기타" },
] as const;

const PERIOD_OPTIONS = ["1개월", "3개월", "6개월"] as const;
const STATUS_OPTIONS = ["전체 문의", "답변 완료", "답변 대기"] as const;

type CategoryValue = (typeof CATEGORY_OPTIONS)[number]["value"];
type PeriodValue = (typeof PERIOD_OPTIONS)[number];
type StatusValue = (typeof STATUS_OPTIONS)[number];

const CATEGORY_TO_SERVER: Record<
  Exclude<CategoryValue, "전체">,
  InquiryCategoryServer
> = {
  보상: "REWARD",
  "미션 및 퀴즈": "MISSION_QUIZ",
  "상점 및 꾸미기": "SHOP_DECORATION",
  계정: "ACCOUNT",
  기타: "ETC",
};

const PERIOD_TO_SERVER: Record<PeriodValue, InquiryPeriodServer> = {
  "1개월": "P1M",
  "3개월": "P3M",
  "6개월": "P6M",
};

const STATUS_TO_SERVER: Record<StatusValue, InquiryAnswerStatusServer> = {
  "전체 문의": "ALL",
  "답변 완료": "COMPLETED",
  "답변 대기": "PENDING",
};

const PERIOD_OPTION_ITEMS = PERIOD_OPTIONS.map((value) => ({
  value,
  label: value,
}));
const STATUS_OPTION_ITEMS = STATUS_OPTIONS.map((value) => ({
  value,
  label: value,
}));

type FilterMenu = "category" | "period" | "status" | null;

type Props = {
  onSelect: (id: number) => void;
};

type MenuProps<T extends string> = {
  options: ReadonlyArray<{ value: T; label: string }>;
  selectedValue: T;
  onSelect: (value: T) => void;
  className: string;
};

function FilterMenuBox<T extends string>({
  options,
  selectedValue,
  onSelect,
  className,
}: MenuProps<T>) {
  return (
    <div
      className={[
        "absolute top-full left-0 mt-3 flex flex-col items-start space-y-4 rounded-sm border border-gray-400 bg-gray-300",
        className,
      ].join(" ")}
      style={{ boxShadow: "3px 9px 20.1px 3px rgba(0, 0, 0, 0.10)" }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className="flex h-17 items-center gap-4"
        >
          <span className="flex h-16 w-16 items-center justify-center">
            {selectedValue === option.value && (
              <IcCheck className="h-16 w-16 text-moamoa-400" />
            )}
          </span>
          <span className="body-5 whitespace-nowrap text-center text-gray-800">
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
function formatIsoToDotDate(iso: string) {
  // "2026-02-05T..." -> "2026.02.05"
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function InquiryList({ onSelect }: Props) {
  const [openMenu, setOpenMenu] = useState<FilterMenu>(null);

  // ✅ category “필수 선택” 전제면 기본값 하나 잡기
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>(
    CATEGORY_OPTIONS[0].value
  );
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodValue>(
    PERIOD_OPTIONS[0]
  );
  const [selectedStatus, setSelectedStatus] = useState<StatusValue>(
    STATUS_OPTIONS[0]
  );

  const toggleMenu = (menu: FilterMenu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const selectedCategoryLabel =
    CATEGORY_OPTIONS.find((option) => option.value === selectedCategory)
      ?.label ?? selectedCategory;

  const categoryParam =
    selectedCategory === "전체"
      ? undefined
      : CATEGORY_TO_SERVER[selectedCategory];
  const periodParam = PERIOD_TO_SERVER[selectedPeriod];
  const statusParam = STATUS_TO_SERVER[selectedStatus];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyInquiries({
      category: categoryParam,
      period: periodParam,
      answerStatus: statusParam,
      size: 10,
    });

  const items: MyInquiryListItemApi[] = data.pages.flatMap((p) => p.items);

  // ✅ 무한스크롤 트리거 (라이브러리 없이)
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
      },
      { rootMargin: "200px" } // 미리 로딩
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex w-full flex-col items-center pt-36">
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-10">
          <span className="body-4 whitespace-nowrap text-black">문의 내역</span>
          <span className="body-4 whitespace-nowrap text-black">
            {items.length}
          </span>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleMenu("category")}
              className="flex items-center gap-2"
            >
              <span className="body-5 whitespace-nowrap text-gray-800">
                {selectedCategoryLabel}
              </span>
              <IcLeft
                className={[
                  "h-16 w-16 text-gray-800",
                  openMenu === "category" ? "rotate-90" : "-rotate-90",
                ].join(" ")}
              />
            </button>

            {openMenu === "category" && (
              <FilterMenuBox
                options={CATEGORY_OPTIONS}
                selectedValue={selectedCategory}
                onSelect={(value) => {
                  setSelectedCategory(value);
                  setOpenMenu(null);
                }}
                className="w-84 px-4 py-8"
              />
            )}
          </div>

          <div className="relative flex items-center gap-4">
            <button
              type="button"
              onClick={() => toggleMenu("period")}
              className="flex items-center gap-4"
            >
              <span className="body-5 whitespace-nowrap text-gray-800">
                {selectedPeriod}
              </span>
              <IcLeft
                className={[
                  "h-16 w-16 text-gray-800",
                  openMenu === "period" ? "rotate-90" : "-rotate-90",
                ].join(" ")}
              />
            </button>

            {openMenu === "period" && (
              <FilterMenuBox
                options={PERIOD_OPTION_ITEMS}
                selectedValue={selectedPeriod}
                onSelect={(value) => {
                  setSelectedPeriod(value);
                  setOpenMenu(null);
                }}
                className="w-54 pt-4 pr-0 pb-4 pl-2"
              />
            )}
          </div>

          <div className="relative flex items-center gap-4">
            <button
              type="button"
              onClick={() => toggleMenu("status")}
              className="flex items-center gap-4"
            >
              <span className="body-5 whitespace-nowrap text-gray-800">
                {selectedStatus}
              </span>
              <IcLeft
                className={[
                  "h-16 w-16 text-gray-800",
                  openMenu === "status" ? "rotate-90" : "-rotate-90",
                ].join(" ")}
              />
            </button>

            {openMenu === "status" && (
              <FilterMenuBox
                options={STATUS_OPTION_ITEMS}
                selectedValue={selectedStatus}
                onSelect={(value) => {
                  setSelectedStatus(value);
                  setOpenMenu(null);
                }}
                className="w-72 px-2 py-4"
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 flex w-full flex-col gap-12">
        {items.map((item) => {
          const status: AnswerStatus = item.answered ? "COMPLETED" : "PENDING";

          return (
            <button
              key={item.inquiryId}
              type="button"
              onClick={() => onSelect(item.inquiryId)}
              className="flex h-164 w-full items-center rounded-lg bg-white px-16 py-10 pr-27 pb-17 text-left shadow-[0_0_16.9px_0_rgba(0,0,0,0.10)]"
            >
              <div className="flex w-full flex-col items-start gap-16 text-left">
                <div className="flex items-center gap-12">
                  <span className="body-4 whitespace-nowrap text-black">
                    {formatIsoToDotDate(item.createdAt)}
                  </span>
                  <StatusPill status={status} />
                </div>

                <div className="flex w-full flex-col items-start gap-12 text-left">
                  <p className="heading-5 w-full truncate text-black">
                    {item.title}
                  </p>
                  <p className="body-4 w-full truncate text-black">
                    {item.contentPreview}
                  </p>
                  {item.answered && (item.responderName || item.answerPreview) && (
                    <div className="flex w-full flex-col items-start gap-6">
                      {item.responderName && (
                        <span className="body-4 flex items-center gap-6 text-black">
                          <IcReply className="h-16 w-16" aria-hidden />
                          담당자 {item.responderName} 답변 :
                          {item.answerPreview ? (
                            <span className=" truncate text-black body-4">
                              {item.answerPreview}
                            </span>
                          ) : null}
                        </span>
                      )}
                      {!item.responderName && item.answerPreview && (
                        <p className="body-5 w-full truncate text-gray-700">
                          답변: {item.answerPreview}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ✅ 무한스크롤 감지용 (UI 영향 거의 없음) */}
      <div ref={sentinelRef} className="h-1 w-full" />
    </div>
  );
}
