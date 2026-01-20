import IcHeartEmpty from "@/assets/icons/ic_heart.svg?react";
import IcHeartFilled from "@/assets/icons/ic_heart2.svg?react";
import type { MissionItem } from "../../types/mypage.type";

function HeartIcon({ filled }: { filled: boolean }) {
  const Icon = filled ? IcHeartFilled : IcHeartEmpty;

  return (
    <Icon
      className={[
        "h-[24px] w-[24px]",
        filled ? "text-[#5586F1]" : "text-[#C9D2E3]",
      ].join(" ")}
      aria-hidden
    />
  );
}

export default function MissionCard({
  item,
  keywords,
  onToggleLike,
  onClickDetail,
}: {
  item: MissionItem;
  keywords: string[];
  onToggleLike: (id: string) => void;
  onClickDetail: (id: string) => void;
}) {
  const displayKeywords =
    keywords.length > 0 ? keywords.slice(0, 3) : ["키워드", "키워드", "키워드"];

  return (
    <article
      className="box-border flex h-[221px] w-[325px] flex-col items-start gap-1 rounded-xl bg-white px-[20px] py-[24px]"
      style={{
        border: "1px solid var(--color-moamoa-50)",
        boxShadow: "0 0 16.9px rgba(0,0,0,0.10)",
      }}
    >
      <div className="flex h-[28px] w-full items-center">
        <h3 className="heading-3 h-28 w-236 overflow-hidden text-ellipsis whitespace-nowrap text-[var(--color-black)]">
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

      <div className="mt-14 flex gap-4">
        {displayKeywords.map((keyword, idx) => (
          <div
            key={`${keyword}-${idx}`}
            className="body-4 flex h-34 w-70 items-center justify-center rounded-sm bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-500)]"
          >
            {keyword}
          </div>
        ))}
      </div>

      <div className="mt-[12px] flex w-full">
        <div className="h-[83px] w-[133px] space-y-[10px]">
          {[
            {
              label: "예상 소요시간",
              value: `${item.expectedMinutes}분`,
              labelWidth: 86,
            },
            {
              label: "카테고리",
              value: item.category,
              labelWidth: 55,
            },
            {
              label: "퀴즈 개수",
              value: "3개",
              labelWidth: 59,
            },
          ].map(({ label, value, labelWidth }) => (
            <div
              key={label}
              className="body-2 flex items-center text-black leading-[21px]"
            >
              <span className="whitespace-nowrap" style={{ width: labelWidth }}>
                {label}
              </span>
              <span className="mx-[6px]">:</span>
              <span className="whitespace-nowrap">{value}</span>
            </div>
          ))}
        </div>

        <div className="w-26" />

        <div className="flex h-83 flex-1 items-end justify-end">
          <button
            type="button"
            onClick={() => onClickDetail(item.id)}
            className="flex h-44 w-126 items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-[#EEF4FF] px-[16px] py-[10px] font-semibold text-[#2E5FEA] text-[14px] leading-[18px]"
          >
            자세히 보기
          </button>
        </div>
      </div>
    </article>
  );
}
