import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";
import IcProfile2 from "@/assets/icons/profile/ic_profile2.svg?react";
import IcProfile3 from "@/assets/icons/profile/ic_profile3.svg?react";
import type { ProfileOption } from "../types/settings.type";

type Props = {
  open: boolean;
  profiles: ProfileOption[];
  selectedId: string;
  onClose: () => void;
  onSelect: (id: string) => void;
};

const PROFILE_ICONS = [IcProfile1, IcProfile2, IcProfile3];

export default function ProfilePickerModal({
  open,
  profiles,
  selectedId,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="닫기"
        onClick={onClose}
      />

      <div className="absolute right-0 bottom-0 left-0 rounded-t-2xl bg-[var(--color-white)] p-20 shadow-lg">
        <div className="heading-5 text-[var(--color-gray-800)]">
          프로필 선택(캐릭터)
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          {profiles.map((p, index) => {
            const selected = p.id === selectedId;
            const Icon = PROFILE_ICONS[index % PROFILE_ICONS.length];

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <Icon
                  className={[
                    "h-64 w-64",
                    selected ? "opacity-100" : "opacity-50",
                  ].join(" ")}
                  aria-hidden
                />
                <span
                  className={[
                    "body-5",
                    selected
                      ? "text-[var(--color-moamoa-400)]"
                      : "text-[var(--color-gray-500)]",
                  ].join(" ")}
                >
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-[var(--color-gray-100)] py-12 text-[var(--color-gray-700)]"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
