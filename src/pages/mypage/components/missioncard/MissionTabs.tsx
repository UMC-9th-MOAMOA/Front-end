import type { MissionSubTabKey } from "../../types/mypage.type";

type DoneView = "done" | "retry";

type Props = {
  subTab: MissionSubTabKey;
  doneView: DoneView;
  onSelect: (nextSubTab: MissionSubTabKey, nextDoneView: DoneView) => void;
};

export default function MissionTabs({ subTab, doneView, onSelect }: Props) {
  const segmentBase =
    "flex h-40 w-108 items-center justify-center rounded-lg body-2 whitespace-nowrap";

  const segmentActive =
    "bg-[var(--color-moamoa-300)] text-[var(--color-white)]";

  const segmentInactive =
    "bg-[var(--color-moamoa-50)] text-[var(--color-positive)]";

  const isLikedTab = subTab === "liked";
  const isDoneTab = subTab === "done";
  const isRetryView = doneView === "retry";

  return (
    <div className="mt-[26px]">
      <div className="mx-auto flex h-40 w-324 rounded-lg bg-[var(--color-moamoa-50)] p-0">
        <button
          type="button"
          onClick={() => onSelect("liked", "done")}
          className={[
            segmentBase,
            isLikedTab ? segmentActive : segmentInactive,
          ].join(" ")}
          aria-label="찜한 미션"
        >
          찜한 미션
        </button>

        <button
          type="button"
          onClick={() => onSelect("done", "done")}
          className={[
            segmentBase,
            isDoneTab && !isRetryView ? segmentActive : segmentInactive,
          ].join(" ")}
        >
          완료
        </button>

        <button
          type="button"
          onClick={() => onSelect("done", "retry")}
          className={[
            segmentBase,
            isRetryView ? segmentActive : segmentInactive,
          ].join(" ")}
        >
          다시 풀기
        </button>
      </div>
    </div>
  );
}
