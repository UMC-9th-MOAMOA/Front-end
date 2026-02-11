import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AsyncBoundary from "@/components/AsyncBoundary";
import Header from "@/components/common/header/Header";
import { useAuthStore } from "@/store/auth";
import { useSettingsStore } from "@/store/settings";
import { useMyProfile } from "./components/account/hooks/useMyProfile";
import LogoutConfirmModal from "./components/LogoutConfirmModal";
import ProfileHeaderCard from "./components/ProfileHeaderCard";
import { LogoutAction, WithdrawAction } from "./components/SettingsActions";
import { SettingsSection, sections } from "./components/SettingsSectionList";
import WithdrawConfirmModal from "./components/WithdrawConfirmModal";
import { useLogout } from "./hooks/useLogout";
import { useWithdraw } from "./hooks/useWithdraw";

function SettingsPageInner() {
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const { data: profile } = useMyProfile();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setShowLogoutToast = useSettingsStore(
    (state) => state.setShowLogoutToast
  );
  const setShowWithdrawSuccessModal = useSettingsStore(
    (state) => state.setShowWithdrawSuccessModal
  );

  const logoutMutation = useLogout({
    onSuccess: () => {
      setIsLogoutOpen(false);
      setShowLogoutToast(true);
      navigate("/");
      setTimeout(() => {
        setAuthenticated(false);
      }, 100);
    },
  });

  const withdrawMutation = useWithdraw({
    onSuccess: () => {
      setIsWithdrawOpen(false);
      setShowWithdrawSuccessModal(true);
    },
  });

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const onLogout = () => setIsLogoutOpen(true);
  const onWithdraw = () => setIsWithdrawOpen(true);

  const handleLogoutConfirm = () => {
    logoutMutation.mutate();
  };

  const handleWithdrawConfirm = () => {
    withdrawMutation.mutate();
  };

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
        onConfirm={handleWithdrawConfirm}
      />

      <LogoutConfirmModal
        open={isLogoutOpen}
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AsyncBoundary>
      <SettingsPageInner />
    </AsyncBoundary>
  );
}
