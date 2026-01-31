import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";

type Props = {
  name: string;
  email: string;
  profileLabel: string;
  onClickProfile: () => void;
};

export default function ProfileHeaderCard({
  name,
  email,
  profileLabel,
  onClickProfile,
}: Props) {
  return (
    <section className="-mx-25 flex h-117 w-full items-center justify-center bg-white px-31 pt-17 pb-18">
      <div className="flex w-full items-center gap-18">
        <button type="button" onClick={onClickProfile} aria-label="프로필 변경">
          <IcProfile1 className="h-82 w-82" aria-hidden />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-8">
            <h2 className="heading-3 text-black">{name}</h2>
            <span className="body-5 text-gray-600">{profileLabel}</span>
          </div>
          <p className="body-4 mt-10 text-gray-500">{email}</p>
        </div>
      </div>
    </section>
  );
}
