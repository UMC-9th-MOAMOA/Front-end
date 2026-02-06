import { useState } from "react";
import Header from "@/components/common/header/Header";
import BottomActionBar from "./components/common/BottomActionBar";
import PasswordChangeForm from "./components/Password/PasswordChangeForm";
import PasswordChangeIntro from "./components/Password/PasswordChangeIntro";
import PasswordChangeSuccessModal from "./components/Password/PasswordChangeSuccessModal";
import { useChangePassword } from "./components/Password/hooks/useChangePassword";

export default function PasswordChangePage() {
  const [successOpen, setSuccessOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");
  const { mutate, isPending } = useChangePassword();

  const onSubmit = () => {
    mutate(
      {
        currentPassword: currentPw,
        newPassword: newPw,
        newPasswordCheck: newPwCheck,
      },
      { onSuccess: () => setSuccessOpen(true) }
    );
  };

  const onConfirmSuccess = () => {
    setSuccessOpen(false);
    // TODO: 로그인 페이지로 이동 or 설정 페이지로 이동
  };

  return (
    <>
      <Header title="비밀번호 변경" property="common" />
      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="w-full bg-white pt-20 pb-28">
        <PasswordChangeIntro />
        <PasswordChangeForm
          currentPw={currentPw}
          newPw={newPw}
          newPwCheck={newPwCheck}
          onChangeCurrentPw={setCurrentPw}
          onChangeNewPw={setNewPw}
          onChangeNewPwCheck={setNewPwCheck}
        />

        <PasswordChangeSuccessModal
          open={successOpen}
          onConfirm={onConfirmSuccess}
        />
      </div>

      <BottomActionBar
        label={isPending ? "변경 중..." : "비밀번호 변경하기"}
        onClick={onSubmit}
        disabled={isPending || !currentPw || !newPw || !newPwCheck}
      />
    </>
  );
}
