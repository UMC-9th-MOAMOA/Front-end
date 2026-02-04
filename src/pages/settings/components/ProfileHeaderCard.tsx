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
    <section className="flex h-[117px] w-full items-center justify-center bg-white px-6 py-4">
      <div className="flex w-full items-center gap-[18px] pl-[31px]">
        <button type="button" onClick={onClickProfile} aria-label="프로필 변경">
          <IcProfile1 className="h-[82px] w-[82px]" aria-hidden />
        </button>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="heading-3 text-black">{name}</h2>
            <span className="body-5 text-gray-600">{profileLabel}</span>
          </div>
          <p className="body-4 mt-2 text-gray-500">{email}</p>
        </div>
      </div>
    </section>
  );
}
