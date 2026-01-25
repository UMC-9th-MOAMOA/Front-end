import { useMemo } from "react";
import Header from "@/components/common/header/Header";
import AccountInfoForm from "./components/account/AccountInfoForm";
import AccountInfoHeader from "./components/account/AccountInfoHeader";
import { mockUser } from "./mocks/settings.mock";

export default function AccountInfoPage() {
  // TODO(API 연결 시): user를 query로 교체
  const user = mockUser;
  const initial = useMemo(() => user, [user]);

  return (
    <div className="flex min-h-1213 w-full flex-col overflow-y-auto pb-40">
      <Header title="프로필 수정" property="common" />

      <div className="flex w-full flex-1 flex-col items-center pb-40">
        <AccountInfoHeader />
        <AccountInfoForm initial={initial} />
      </div>
    </div>
  );
}
