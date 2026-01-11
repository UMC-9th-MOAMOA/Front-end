import type { ProfileOption } from "../types/settings.type";

type Props = {
  open: boolean;
  profiles: ProfileOption[];
  selectedId: string;
  onClose: () => void;
  onSelect: (id: string) => void;
};

function ProfileCircle({
  label,
  selected,
}: {
  label: string;
  selected: boolean;
}) {
  return (
    <div
      className={[
        "flex h-16 w-16 items-center justify-center rounded-full font-bold",
        selected ? "bg-blue-200 text-blue-700" : "bg-gray-100 text-gray-500",
      ].join(" ")}
    >
      {label.slice(0, 2)}
    </div>
  );
}

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
      {/* overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="닫기"
        onClick={onClose}
      />

      {/* sheet */}
      <div className="absolute right-0 bottom-0 left-0 rounded-t-2xl bg-white p-5 shadow-lg">
        <div className="font-semibold text-gray-800 text-sm">
          프로필 예시(더미)
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          {profiles.map((p) => {
            const selected = p.id === selectedId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <ProfileCircle label={p.label} selected={selected} />
                <span
                  className={[
                    "text-xs",
                    selected ? "font-semibold text-blue-700" : "text-gray-500",
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
          className="mt-5 w-full rounded-xl bg-gray-100 py-3 font-semibold text-gray-700 text-sm"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
