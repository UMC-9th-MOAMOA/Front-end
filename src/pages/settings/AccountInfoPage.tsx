import { useMemo } from "react";
import Header from "@/components/common/header/Header";
import AccountInfoForm from "./components/account/AccountInfoForm";
import AccountInfoHeader from "./components/account/AccountInfoHeader";
import BottomActionBar from "./components/common/BottomActionBar";
import { mockUser } from "./mocks/account/account.mock";

export default function AccountInfoPage() {
  // TODO(API 연결 시): user를 query로 교체
  const user = mockUser;
  const initial = useMemo(() => user, [user]);

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-y-auto pb-98">
      <Header title="프로필 수정" property="common" />
      <div className="mt-14 h-2 w-screen -ml-25 bg-[var(--color-gray-200)]" />

      <div className="flex w-full flex-1 flex-col items-center pb-40">
        <AccountInfoHeader />
        <AccountInfoForm initial={initial} />
      </div>

      <BottomActionBar label="변경하기" />
    </div>
  );
}
