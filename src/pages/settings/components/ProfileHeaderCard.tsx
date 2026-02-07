import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";
import IcProfile2 from "@/assets/icons/profile/ic_profile2.svg?react";
import IcProfile3 from "@/assets/icons/profile/ic_profile3.svg?react";

type Props = {
  name: string;
  email: string;
  profileImage: number;
};

export default function ProfileHeaderCard({
  name,
  email,
  profileImage,
}: Props) {
  const ProfileIcon =
    profileImage === 1
      ? IcProfile1
      : profileImage === 2
        ? IcProfile2
        : IcProfile3;

  return (
    <section className="flex h-117 w-full items-center justify-center bg-white px-6 py-4">
      <div className="flex w-full items-center gap-18 pl-31">
        <ProfileIcon className="h-[82px] w-[82px]" aria-hidden />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="heading-3 text-black">{name}</h2>
          </div>
          <p className="body-4 mt-2 text-gray-500">{email}</p>
        </div>
      </div>
    </section>
  );
}
