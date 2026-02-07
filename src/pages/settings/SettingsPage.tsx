import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import { useMyProfile } from "./components/account/hooks/useMyProfile";
import LogoutConfirmModal from "./components/LogoutConfirmModal";
import ProfileHeaderCard from "./components/ProfileHeaderCard";
import { LogoutAction, WithdrawAction } from "./components/SettingsActions";
import { SettingsSection, sections } from "./components/SettingsSectionList";
import WithdrawConfirmModal from "./components/WithdrawConfirmModal";

function SettingsPageInner() {
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const { data: profile } = useMyProfile();

  const onNavigate = (path: string) => {
    navigate(path);
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

      <div className="-mx-25 w-screen bg-setting">
        <ProfileHeaderCard
          name={profile.name}
          email={profile.email}
          profileImage={profile.profileImage}
        />
      </div>

      <div className="-mx-25 mt-10 w-screen">
        <div className="flex w-full flex-1 flex-col bg-white pt-28">
          <div className="flex flex-col gap-20 px-25">
            {sections.map((section, index) => (
              <div key={section.id}>
                <SettingsSection section={section} onNavigate={onNavigate} />
                {index < sections.length - 1 && (
                  <div className="-mx-25 h-2 w-screen" style={dividerStyle} />
                )}
              </div>
            ))}
          </div>

          <div className="mt-45 px-25">
            <LogoutAction onLogout={onLogout} />
          </div>
          <div className="-mx-25 mt-34 h-2 w-screen" style={dividerStyle} />
          <div className="px-25">
            <WithdrawAction onWithdraw={onWithdraw} />
          </div>
        </div>
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
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="p-20">로딩중...</div>}>
      <SettingsPageInner />
    </Suspense>
  );
}
