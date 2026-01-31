import type { CSSProperties } from "react";
import { Button } from "@/components/common/button/Button";

type Props = {
  dividerStyle: CSSProperties;
  onLogout: () => void;
  onWithdraw: () => void;
};

export default function SettingsActions({
  dividerStyle,
  onLogout,
  onWithdraw,
}: Props) {
  return (
    <div className="mb-61 flex flex-col items-center">
      <Button
        type="button"
        className="heading-5 flex flex-col items-center justify-center gap-4 rounded-lg bg-[var(--color-moamoa-50)] px-16 py-10 text-moamoa-600"
        onClick={onLogout}
      >
        로그아웃
      </Button>

      <div className="mt-34 h-2 w-full" style={dividerStyle} />

      <p className="heading-5 mt-25 mb-16 text-warning">
        정말 탈퇴하시겠어요?
      </p>

      <Button
        type="button"
        // TODO(design-token): replace bg-[#FFE4E4] with a color token when available.
        className="heading-5 flex flex-col items-center justify-center gap-4 rounded-lg bg-[#FFE4E4] px-16 py-10 text-warning"
        onClick={onWithdraw}
      >
        탈퇴하기
      </Button>
    </div>
  );
}
