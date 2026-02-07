import IcCheckActive from "@/assets/icons/ic_check_active.svg?react";
import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";
import IcProfile2 from "@/assets/icons/profile/ic_profile2.svg?react";
import IcProfile3 from "@/assets/icons/profile/ic_profile3.svg?react";

const PROFILE_OPTIONS = [
  { id: "1", Icon: IcProfile1 },
  { id: "2", Icon: IcProfile2 },
  { id: "3", Icon: IcProfile3 },
] as const;

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function AccountInfoHeader({ selectedId, onSelect }: Props) {
  const selected =
    PROFILE_OPTIONS.find((p) => p.id === selectedId) ?? PROFILE_OPTIONS[1];
  const SelectedIcon = selected.Icon;

  return (
    <>
      <SelectedIcon className="mt-53 h-164 w-164" aria-hidden />

      <div className="mt-30 mb-43 flex h-115 w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 p-12">
        <div className="flex w-full items-center justify-center gap-12 self-stretch">
          {PROFILE_OPTIONS.map(({ id, Icon }) => {
            const isSelected = id === selectedId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                className="relative flex h-91 w-91 items-center justify-center overflow-hidden rounded-full"
              >
                <Icon className="h-91 w-91" aria-hidden />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[rgba(91,91,91,0.50)]">
                    <IcCheckActive
                      className="h-24 w-24"
                      style={{ filter: "brightness(0) invert(1)" }}
                      aria-hidden
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
