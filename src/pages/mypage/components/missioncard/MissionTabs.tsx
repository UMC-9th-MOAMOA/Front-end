import { Button } from "@/components/common/button/Button";
import type { MissionSubTabKey } from "../../types/mypage.type";

type DoneView = "done" | "retry";

type Props = {
  subTab: MissionSubTabKey;
  doneView: DoneView;
  onSelect: (nextSubTab: MissionSubTabKey, nextDoneView: DoneView) => void;
};

export default function MissionTabs({ subTab, doneView, onSelect }: Props) {
  const segmentBase =
    "flex flex-1 h-40 items-center justify-center rounded-lg body-2 whitespace-nowrap";

  const segmentActive = "bg-moamoa-300 text-white";

  const segmentInactive = "bg-moamoa-50 text-positive";

  const isLikedTab = subTab === "liked";
  const isDoneTab = subTab === "done";
  const isRetryView = doneView === "retry";

  return (
    <div className="flex w-full justify-center pt-26 pb-16">
      <div className="flex w-full max-w-full gap-2 rounded-lg bg-moamoa-50 p-0 shadow-[0_0_18px_rgba(0,0,0,0.08)]">
        <Button
          type="button"
          onClick={() => onSelect("liked", "done")}
          className={[
            segmentBase,
            isLikedTab ? segmentActive : segmentInactive,
          ].join(" ")}
          aria-label="찜한 미션"
        >
          찜한 미션
        </Button>

        <Button
          type="button"
          onClick={() => onSelect("done", "done")}
          className={[
            segmentBase,
            isDoneTab && !isRetryView ? segmentActive : segmentInactive,
          ].join(" ")}
        >
          완료
        </Button>

        <Button
          type="button"
          onClick={() => onSelect("done", "retry")}
          className={[
            segmentBase,
            isRetryView ? segmentActive : segmentInactive,
          ].join(" ")}
        >
          다시 풀기
        </Button>
      </div>
    </div>
  );
}
