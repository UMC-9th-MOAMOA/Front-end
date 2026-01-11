type Props = {
  name: string;
  email: string;
  profileLabel: string;
  onClickProfile: () => void;
  onClickEdit: () => void;
};

function AvatarFallback({ label }: { label: string }) {
  // TODO: 나중에 SVG 프로필로 교체
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
      {label.slice(0, 2)}
    </div>
  );
}

export default function ProfileHeaderCard({
  name,
  email,
  profileLabel,
  onClickProfile,
  onClickEdit,
}: Props) {
  return (
    <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <button type="button" onClick={onClickProfile} aria-label="프로필 변경">
          <AvatarFallback label={profileLabel} />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base text-black">{name}</h2>
            <button
              type="button"
              onClick={onClickEdit}
              aria-label="회원정보 수정"
              className="text-gray-500 text-sm"
              title="회원정보 수정"
            >
              ✎
            </button>
          </div>
          <p className="mt-1 text-gray-400 text-sm">{email}</p>
        </div>
      </div>
    </section>
  );
}
