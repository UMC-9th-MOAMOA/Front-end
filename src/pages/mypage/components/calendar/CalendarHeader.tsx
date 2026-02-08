import IcDropdown from "@/assets/icons/ic_dropdown.svg?react";
import { Button } from "@/components/common/button/Button";

type Props = {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
};

export default function CalendarHeader({ month, onPrev, onNext }: Props) {
  return (
    <div className="flex items-start justify-center">
      <div className="flex h-25 w-153 items-center gap-12">
        <Button
          type="button"
          onClick={onPrev}
          aria-label="이전 달"
          className="flex h-25 w-25 items-center justify-center"
        >
          <IcDropdown
            className="h-13 w-13 rotate-90 text-gray-700"
            aria-hidden
          />
        </Button>

        <div className="heading-4 flex items-center gap-12 whitespace-nowrap text-black">
          <span className="whitespace-nowrap">{month.getFullYear()}년</span>
          <span className="whitespace-nowrap">{month.getMonth() + 1}월</span>
        </div>

        <Button
          type="button"
          onClick={onNext}
          aria-label="다음 달"
          className="flex h-25 w-25 items-center justify-center"
        >
          <IcDropdown
            className="h-13 w-13 -rotate-90 text-gray-700"
            aria-hidden
          />
        </Button>
      </div>
    </div>
  );
}
