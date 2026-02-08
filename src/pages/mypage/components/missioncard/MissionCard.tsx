import IcHeart from "@/assets/icons/ic_heart.svg?react";
import type { MissionItem } from "../../types/mypage.type";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <IcHeart
      className={[
        "h-24 w-24 stroke-current text-moamoa-200",
        filled ? "fill-moamoa-100" : "fill-transparent",
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
  actionLabel,
  disableLike = false,
}: {
  item: MissionItem;
  keywords: string[];
  onToggleLike: (id: string) => void;
  onClickDetail: (id: string) => void;
  actionLabel: string;
  disableLike?: boolean;
}) {
  const displayKeywords =
    keywords.length > 0 ? keywords.slice(0, 3) : ["키워드", "키워드", "키워드"];

  return (
    <article
      className="box-border flex h-205 w-full flex-col items-start gap-1 rounded-xl bg-white px-14 py-16"
      style={{
        border: "1px solid var(--color-moamoa-50)",
        boxShadow: "0 0 16.9px rgba(0,0,0,0.10)",
      }}
    >
      <div className="flex h-28 w-full items-center">
        <h3 className="heading-3 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pt-12 pl-8 text-black">
          {item.title}
        </h3>

        <button
          type="button"
          aria-label="찜 토글"
          onClick={() => onToggleLike(item.id)}
          disabled={disableLike}
          className={[
            "mr-8 h-24 w-24 rounded-none bg-transparent p-0 border-0 shadow-none outline-none focus:outline-none focus:ring-0",
            disableLike ? "cursor-not-allowed opacity-60" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <HeartIcon filled={item.liked} />
        </button>
      </div>

      <div className="mt-14 flex gap-4">
        {displayKeywords.map((keyword, idx) => (
          <div
            key={`${keyword}-${idx}`}
            className="body-4 flex h-34 w-70 items-center justify-center rounded-sm bg-moamoa-50 text-moamoa-500"
          >
            {keyword}
          </div>
        ))}
      </div>

      <div className="mt-12 flex w-full items-end gap-26 px-6">
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          {[
            {
              label: "예상 소요시간",
              value: `${item.expectedMinutes}분`,
              labelWidth: 75,
            },
            {
              label: "카테고리",
              value: item.category,
              labelWidth: 48,
            },
            {
              label: "난이도 개수",
              value: "3개",
              labelWidth: 51,
            },
          ].map(({ label, value, labelWidth }) => (
            <div
              key={label}
              className="body-4 flex items-center text-black leading-21"
            >
              <span className="whitespace-nowrap" style={{ width: labelWidth }}>
                {label}
              </span>
              <span className="mx-6">:</span>
              <span className="whitespace-nowrap">{value}</span>
            </div>
          ))}
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={() => onClickDetail(item.id)}
            className="flex h-40 w-126 flex-col items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-[#EEF4FF] px-16 py-10 font-semibold text-14 text-[#2E5FEA] leading-[18px]"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
