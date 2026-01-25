import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";

type Props = {
  name: string;
  email: string;
  profileLabel: string;
  onClickProfile: () => void;
  onClickEdit: () => void;
};

export default function ProfileHeaderCard({
  name,
  email,
  profileLabel,
  onClickProfile,
  onClickEdit,
}: Props) {
  return (
    <section className="flex h-117 w-full items-center justify-center bg-white px-31 pt-17 pb-18">
      <div className="flex w-full items-center gap-18">
        <button type="button" onClick={onClickProfile} aria-label="프로필 변경">
          <IcProfile1 className="h-82 w-82" aria-hidden />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="heading-3 text-[var(--color-black)]">{name}</h2>
          </div>
          <p className="body-4 mt-10 text-[var(--color-gray-500)]">{email}</p>
        </div>
      </div>
    </section>
  );
}
