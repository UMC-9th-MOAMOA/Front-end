import type { TabKey } from "../../types/inquiry.type";

type Props = {
  tab: TabKey;
  onChange: (tab: TabKey) => void;
};

export default function InquiryTabs({ tab, onChange }: Props) {
  return (
    <div className="flex w-full items-center justify-center">
      <button
        type="button"
        onClick={() => onChange("write")}
        className="relative flex h-40 flex-1 items-center justify-center"
      >
        <span className="heading-5 whitespace-nowrap text-[var(--color-black)]">
          문의 작성
        </span>
        {tab === "write" && (
          <span className="absolute bottom-0 h-1 w-full bg-[var(--color-black)]" />
        )}
      </button>
      <button
        type="button"
        onClick={() => onChange("mine")}
        className="relative flex h-40 flex-1 items-center justify-center"
      >
        <span className="heading-5 whitespace-nowrap text-[var(--color-black)]">
          나의 문의
        </span>
        {tab === "mine" && (
          <span className="absolute bottom-0 h-1 w-full bg-[var(--color-black)]" />
        )}
      </button>
    </div>
  );
}
