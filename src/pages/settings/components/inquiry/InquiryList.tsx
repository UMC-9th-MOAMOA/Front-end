import { useState } from "react";
import IcCheck from "@/assets/icons/ic_check.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcReply from "@/assets/icons/ic_reply.svg?react";
import type { AnswerStatus, MyInquiryItem } from "../../types/inquiry.type";
import StatusPill from "./StatusPill";

const MOCK_MY_INQUIRIES: MyInquiryItem[] = [
  {
    inquiryId: 101,
    createdAt: "2026.01.24",
    answered: true,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    contentPreview: "문의 내용 미리보기입니다. 내용이 길어질 수 있어요.",
    answerPreview: {
      managerLabel: "담당자 000 님",
      preview: "답변 미리보기입니다. 답변이 길어질 수 있어요.",
    },
  },
  {
    inquiryId: 102,
    createdAt: "2026.01.20",
    answered: false,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    contentPreview: "문의 내용 미리보기입니다. 내용이 길어질 수 있어요.",
  },
  {
    inquiryId: 103,
    createdAt: "2026.01.12",
    answered: true,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    contentPreview: "문의 내용 미리보기입니다. 내용이 길어질 수 있어요.",
    answerPreview: {
      managerLabel: "담당자 000 님",
      preview: "답변 미리보기입니다. 답변이 길어질 수 있어요.",
    },
  },
];

const CATEGORY_OPTIONS = [
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

const PERIOD_OPTION_ITEMS: ReadonlyArray<{
  value: PeriodValue;
  label: PeriodValue;
}> = PERIOD_OPTIONS.map((value) => ({ value, label: value }));

const STATUS_OPTION_ITEMS: ReadonlyArray<{
  value: StatusValue;
  label: StatusValue;
}> = STATUS_OPTIONS.map((value) => ({ value, label: value }));

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
        "absolute left-0 top-full mt-3 flex flex-col items-start space-y-4 rounded-sm border border-[var(--color-gray-400)] bg-[var(--color-gray-300)]",
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
              <IcCheck className="h-16 w-16 text-[var(--color-moamoa-400)]" />
            )}
          </span>
          <span className="body-5 whitespace-nowrap text-center text-[var(--color-gray-800)]">
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function InquiryList({ onSelect }: Props) {
  const [openMenu, setOpenMenu] = useState<FilterMenu>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>(
    CATEGORY_OPTIONS[1].value
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
    CATEGORY_OPTIONS.find((option) => option.value === selectedCategory)?.label ??
    selectedCategory;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-36" />

      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-10">
          <span className="body-4 whitespace-nowrap text-[var(--color-black)]">
            문의 내역
          </span>
          <span className="body-4 whitespace-nowrap text-[var(--color-black)]">
            {MOCK_MY_INQUIRIES.length}
          </span>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleMenu("category")}
              className="flex items-center gap-2"
            >
              <span className="body-5 whitespace-nowrap text-[var(--color-gray-800)]">
                {selectedCategoryLabel}
              </span>
              <IcLeft
                className={[
                  "h-16 w-16 text-[var(--color-gray-800)]",
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
              <span className="body-5 whitespace-nowrap text-[var(--color-gray-800)]">
                {selectedPeriod}
              </span>
              <IcLeft
                className={[
                  "h-16 w-16 text-[var(--color-gray-800)]",
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
                className="w-54 pt-4 pb-4 pl-2 pr-0"
              />
            )}
          </div>

          <div className="relative flex items-center gap-4">
            <button
              type="button"
              onClick={() => toggleMenu("status")}
              className="flex items-center gap-4"
            >
              <span className="body-5 whitespace-nowrap text-[var(--color-gray-800)]">
                {selectedStatus}
              </span>
              <IcLeft
                className={[
                  "h-16 w-16 text-[var(--color-gray-800)]",
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

      <div className="h-10" />

      <div className="flex w-full flex-col gap-12">
        {/* TODO: shadow token 적용 필요 */}
        {MOCK_MY_INQUIRIES.map((item) => {
          const status: AnswerStatus = item.answered ? "COMPLETED" : "PENDING";

          return (
            <button
              key={item.inquiryId}
              type="button"
              onClick={() => onSelect(item.inquiryId)}
              className="flex h-164 w-full items-center rounded-lg bg-[var(--color-white)] px-16 py-10 pr-27 pb-17 shadow-[0_0_16.9px_0_rgba(0,0,0,0.10)]"
            >
              <div className="flex w-full flex-col items-start gap-16">
                <div className="flex items-center gap-12">
                  <span className="body-4 whitespace-nowrap text-[var(--color-black)]">
                    {item.createdAt}
                  </span>
                  <StatusPill status={status} />
                </div>

                <div className="flex w-full flex-col items-start gap-12">
                  <p className="heading-5 w-full truncate text-[var(--color-black)]">
                    {item.title}
                  </p>
                  <p className="body-4 w-full truncate text-[var(--color-black)]">
                    {item.contentPreview}
                  </p>

                  {item.answered && item.answerPreview && (
                    <div className="flex w-full items-center">
                      <IcReply className="h-24 w-24" aria-hidden />
                      <div className="ml-3 flex min-w-0 items-center">
                        <span className="body-4 whitespace-nowrap text-[var(--color-black)]">
                          {item.answerPreview.managerLabel}
                        </span>
                        <span className="body-4 mx-2 whitespace-nowrap text-[var(--color-black)]">
                          :
                        </span>
                        <span className="body-4 min-w-0 flex-1 truncate text-[var(--color-black)]">
                          {item.answerPreview.preview}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
