import { useCallback } from "react";
import LogoutToast from "@/pages/settings/components/LogoutToast";
import WithdrawSuccessModal from "@/pages/settings/components/WithdrawSuccessModal";
import router from "@/routes/router";
import { useAuthStore } from "@/store/auth";
import { useSettingsStore } from "@/store/settings";

export default function GlobalModals() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const showLogoutToast = useSettingsStore((state) => state.showLogoutToast);
  const showWithdrawSuccessModal = useSettingsStore(
    (state) => state.showWithdrawSuccessModal
  );
  const setShowWithdrawSuccessModal = useSettingsStore(
    (state) => state.setShowWithdrawSuccessModal
  );

  const handleWithdrawClose = useCallback(() => {
    setShowWithdrawSuccessModal(false);
    router.navigate("/");
    setTimeout(() => {
      setAuthenticated(false);
    }, 100);
  }, [setShowWithdrawSuccessModal, setAuthenticated]);

  return (
    <>
      <LogoutToast show={showLogoutToast} />
      <WithdrawSuccessModal
        open={showWithdrawSuccessModal}
        onClose={handleWithdrawClose}
      />
    </>
  );
}
