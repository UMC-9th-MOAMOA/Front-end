import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import LogoutConfirmModal from "./components/LogoutConfirmModal";
import ProfileHeaderCard from "./components/ProfileHeaderCard";
import ProfilePickerModal from "./components/ProfilePickerModal";
import SettingsActions from "./components/SettingsActions";
import SettingsSectionList from "./components/SettingsSectionList";
import WithdrawConfirmModal from "./components/WithdrawConfirmModal";
import { mockProfiles, mockUser } from "./mocks/account/account.mock";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [isProfilePickerOpen, setIsProfilePickerOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // TODO(API 연결 시): user / profiles를 query로 교체
  const user = mockUser;
  const profiles = mockProfiles;
  const [selectedProfileId, setSelectedProfileId] = useState(user.profileId);

  const selectedProfileLabel = useMemo(() => {
    return profiles.find((p) => p.id === selectedProfileId)?.label ?? "프로필";
  }, [profiles, selectedProfileId]);

  const onClickProfile = () => setIsProfilePickerOpen(true);

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const onSelectProfile = (profileId: string) => {
    // TODO(API 연결 시): PATCH /users/profile 같은 API 호출 후 invalidate
    setSelectedProfileId(profileId);
    setIsProfilePickerOpen(false);
  };

  const onLogout = () => setIsLogoutOpen(true);
  const onWithdraw = () => setIsWithdrawOpen(true);

  const dividerStyle = { background: "var(--MOAMOA-G-200, #EEE)" };

  return (
    <div className="flex w-full flex-col">
      <Header title="설정" property="common" />

      <div
        className="mt-14 mb-10 -ml-25 h-2 w-screen"
        style={{ background: "var(--MOAMOA-G-200, #EEE)" }}
      />

      <ProfileHeaderCard
        name={user.name}
        email={user.email}
        profileLabel={selectedProfileLabel}
        onClickProfile={onClickProfile}
      />

      <div className="mt-10 flex w-full flex-1 flex-col bg-[var(--color-white)] pt-28">
        <SettingsSectionList
          onNavigate={onNavigate}
          dividerStyle={dividerStyle}
        />

        <SettingsActions
          dividerStyle={dividerStyle}
          onLogout={onLogout}
          onWithdraw={onWithdraw}
        />
      </div>

      <WithdrawConfirmModal
        open={isWithdrawOpen}
        onCancel={() => setIsWithdrawOpen(false)}
        onConfirm={() => setIsWithdrawOpen(false)}
      />

      <LogoutConfirmModal
        open={isLogoutOpen}
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={() => setIsLogoutOpen(false)}
      />

      <ProfilePickerModal
        open={isProfilePickerOpen}
        profiles={profiles}
        selectedId={selectedProfileId}
        onClose={() => setIsProfilePickerOpen(false)}
        onSelect={onSelectProfile}
      />
    </div>
  );
}
