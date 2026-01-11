import { useMemo, useState } from "react";
import Header from "@/components/common/Header";
import AccountInfoForm from "./components/AccountInfoForm";
import AccountTabs from "./components/AccountTabs";
import PasswordChangeForm from "./components/PasswordChangeForm";
import useAccountTab from "./hooks/useAccountTab";
import { mockUser } from "./mocks/settings.mock";

export default function AccountSettingsPage() {
  const { tab, setTab } = useAccountTab("info");

  // TODO(API 연결 시): user를 query로 교체
  const user = mockUser;

  // 폼의 초기값
  const initial = useMemo(() => user, [user]);

  const [saving, setSaving] = useState(false);

  const onSubmit = async () => {
    // TODO(API 연결 시): tab 별로 PATCH 호출
    setSaving(true);
    try {
      console.log("submit account settings. tab:", tab);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4">
      <Header title="회원정보수정" property="common" />

      <AccountTabs activeTab={tab} onChange={setTab} />

      {tab === "info" && <AccountInfoForm initial={initial} />}
      {tab === "password" && <PasswordChangeForm />}

      <button
        type="button"
        disabled={saving}
        onClick={onSubmit}
        className="mt-10 w-full rounded-xl bg-blue-500 py-3 font-semibold text-white active:bg-blue-600 disabled:opacity-50"
      >
        변경하기
      </button>
    </div>
  );
}
