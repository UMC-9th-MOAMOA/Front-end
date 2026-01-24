import { useMemo, useState } from "react";
import IcProfile1 from "@/assets/icons/profile/ic_profile1.svg?react";
import IcProfile2 from "@/assets/icons/profile/ic_profile2.svg?react";
import IcProfile3 from "@/assets/icons/profile/ic_profile3.svg?react";
import Header from "@/components/common/header/Header";
import AccountInfoForm from "./components/AccountInfoForm";
import { mockUser } from "./mocks/settings.mock";

export default function AccountInfoPage() {
  // TODO(API 연결 시): user를 query로 교체
  const user = mockUser;
  const initial = useMemo(() => user, [user]);
  const [saving, setSaving] = useState(false);

  const onSubmit = async () => {
    // TODO(API 연결 시): PATCH /users/me
    setSaving(true);
    try {
      console.log("submit account info");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto pb-40">
      <Header title="프로필 수정" property="common" />

      {/* Header 아래 간격 14 */}
      <div className="flex w-full flex-col items-center">
        <div className="h-[14px]" />

        {/* 구분선 393 x 2 */}
        <div className="h-[2px] w-[393px] bg-[var(--color-gray-200)]" />

        {/* 구분선 아래 간격 53 */}
        <div className="h-[53px]" />

        {/* 메인 프로필 아이콘 (164 x 164) */}
        <IcProfile2 className="h-[164px] w-[164px]" aria-hidden />

        {/* 아이콘 아래 간격 30 */}
        <div className="h-[30px]" />

        {/* 프로필 선택 박스 (325 x 115) */}
        <div className="flex h-[115px] w-[325px] flex-col items-center justify-center gap-[4px] rounded-[12px] bg-[var(--color-gray-100)] p-[12px]">
          {/* 내부 row */}
          <div className="flex items-center gap-[12px] self-stretch">
            <IcProfile3 className="h-[91px] w-[91px]" aria-hidden />
            <IcProfile2 className="h-[91px] w-[91px]" aria-hidden />
            <IcProfile1 className="h-[91px] w-[91px]" aria-hidden />
          </div>
        </div>

        {/* 박스 아래 간격 43 */}
        <div className="h-[43px]" />
      </div>

      {/* 기존 폼: "이름"부터 이어서 */}
      <AccountInfoForm initial={initial} />
    </div>
  );
}
