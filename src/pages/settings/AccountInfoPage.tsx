import { Suspense, useEffect, useState } from "react";
import Header from "@/components/common/header/Header";
import AccountInfoForm from "./components/account/AccountInfoForm";
import AccountInfoHeader from "./components/account/AccountInfoHeader";
import {
  useMyProfile,
  useUpdateMyProfile,
} from "./components/account/hooks/useMyProfile";
import BottomActionBar from "./components/common/BottomActionBar";
import type { UserProfile } from "./types/settings.type";
import {
  toHyphenDate,
  toServerGender,
  toUserProfile,
} from "./components/account/utils/profileMapper";

function AccountInfoPageInner() {
  const { data: profile } = useMyProfile();
  const { mutate, isPending } = useUpdateMyProfile();

  const initial = toUserProfile(profile);

  // ✅ 초기값 로드 후 draft를 맞춰줌 (Suspense라도 안전하게)
  const [draft, setDraft] = useState<UserProfile>(initial);
  useEffect(() => {
    setDraft(initial);
  }, [initial]); // profile이 바뀌면 초기화(키는 아무거나 안정적으로 하나)

  const handleSubmit = () => {
    const profileImage = Number(draft.profileId);

    mutate({
      profileImage: Number.isNaN(profileImage)
        ? profile.profileImage
        : profileImage,
      name: draft.name,
      birthday: toHyphenDate(draft.birthDate),
      gender: toServerGender(draft.gender),
    });
  };

  return (
    <div>
      <Header title="프로필 설정" property="common" />
      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="flex min-h-dvh w-full flex-col overflow-y-auto">
        <div className="flex w-full flex-1 flex-col items-center pb-40">
          <AccountInfoHeader />
          <AccountInfoForm initial={initial} onChangeDraft={setDraft} />
        </div>

        <BottomActionBar
          label={isPending ? "변경 중..." : "변경하기"}
          onClick={handleSubmit}
          disabled={isPending}
        />
      </div>
    </div>
  );
}

export default function AccountInfoPage() {
  return (
    <Suspense fallback={<div className="p-20">로딩중...</div>}>
      <AccountInfoPageInner />
    </Suspense>
  );
}
