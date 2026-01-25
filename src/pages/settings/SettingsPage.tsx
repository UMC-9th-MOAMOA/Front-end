import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import ProfileHeaderCard from "./components/ProfileHeaderCard";
import ProfilePickerModal from "./components/ProfilePickerModal";
import SettingsActions from "./components/SettingsActions";
import SettingsSectionList from "./components/SettingsSectionList";
import LogoutConfirmModal from "./components/LogoutConfirmModal";
import WithdrawConfirmModal from "./components/WithdrawConfirmModal";
import { mockProfiles, mockUser } from "./mocks/settings.mock";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [isProfilePickerOpen, setIsProfilePickerOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // TODO(API 연결 시): user / profiles를 query로 교체
  const user = mockUser;
  const profiles = mockProfiles;

  const selectedProfileLabel = useMemo(() => {
    return profiles.find((p) => p.id === user.profileId)?.label ?? "프로필";
  }, [profiles, user.profileId]);

  const onClickProfile = () => setIsProfilePickerOpen(true);

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const onSelectProfile = (profileId: string) => {
    // TODO(API 연결 시): PATCH /users/profile 같은 API 호출 후 invalidate
    console.log("select profile:", profileId);
    setIsProfilePickerOpen(false);
  };

  const onClickEdit = () => onNavigate("/settings/account");
  const onLogout = () => setIsLogoutOpen(true);
  const onWithdraw = () => setIsWithdrawOpen(true);

  const dividerStyle = { background: "var(--MOAMOA-G-200, #EEE)" };

  return (
    // TODO(design-token): replace bg-[#FAFAFA] with a color token when available.
    <div className="flex w-full flex-col bg-[#FAFAFA]">
      <Header title="설정" property="common" />

      <div
        className="mt-14 mb-10 h-2 w-screen -ml-25"
        style={{ background: "var(--MOAMOA-G-200, #EEE)" }}
      />

      <ProfileHeaderCard
        name={user.name}
        email={user.email}
        profileLabel={selectedProfileLabel}
        onClickProfile={onClickProfile}
        onClickEdit={onClickEdit}
      />

      <div className="mt-10 flex h-977 w-full flex-1 flex-col bg-[var(--color-white)] pt-28">
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
        selectedId={user.profileId}
        onClose={() => setIsProfilePickerOpen(false)}
        onSelect={onSelectProfile}
      />
    </div>
  );
}
