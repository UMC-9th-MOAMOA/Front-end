import type { CSSProperties } from "react";

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
    <div className="mt-67 flex flex-col items-center">
      <button
        type="button"
        className="heading-5 flex h-44 w-126 flex-col items-center justify-center gap-4 rounded-lg bg-[var(--color-moamoa-50)] px-16 py-10 text-[var(--color-moamoa-600)]"
        onClick={onLogout}
      >
        로그아웃
      </button>

      <div className="mt-34 h-2 w-full" style={dividerStyle} />

      <p className="heading-5 mt-25 mb-16 text-[var(--color-warning)]">
        정말 탈퇴하시겠어요?
      </p>

      <button
        type="button"
        // TODO(design-token): replace bg-[#FFE4E4] with a color token when available.
        className="heading-5 flex h-44 w-126 flex-col items-center justify-center gap-4 rounded-lg bg-[#FFE4E4] px-16 py-10 text-[var(--color-warning)]"
        onClick={onWithdraw}
      >
        탈퇴하기
      </button>
    </div>
  );
}
