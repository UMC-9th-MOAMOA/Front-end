import { useEffect, useState } from "react";
import Header from "@/components/common/header/Header";
import { ERROR_CODES } from "@/constants/errorCodes";
import type { ApiError } from "@/types/api/api";
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
  const [currentPwError, setCurrentPwError] = useState("");
  const [newPwCheckError, setNewPwCheckError] = useState("");
  const { mutate, isPending } = useChangePassword();

  useEffect(() => {
    if (!newPwCheck) {
      setNewPwCheckError("");
      return;
    }

    if (newPw !== newPwCheck) {
      setNewPwCheckError("비밀번호가 일치하지 않아요.");
      return;
    }

    setNewPwCheckError("");
  }, [newPw, newPwCheck]);

  const onSubmit = () => {
    if (newPw !== newPwCheck) {
      setNewPwCheckError("비밀번호가 일치하지 않아요.");
      return;
    }

    mutate(
      {
        currentPassword: currentPw,
        newPassword: newPw,
        newPasswordCheck: newPwCheck,
      },
      {
        onSuccess: () => {
          setCurrentPw("");
          setNewPw("");
          setNewPwCheck("");
          setCurrentPwError("");
          setNewPwCheckError("");
          setSuccessOpen(true);
        },
        onError: (error) => {
          const apiError = error as ApiError;
          if (apiError.serverCode === ERROR_CODES.MEMBER.PW_MISMATCH) {
            setCurrentPwError("비밀번호가 일치하지 않아요.");
          }
        },
      }
    );
  };

  const onConfirmSuccess = () => {
    setSuccessOpen(false);
    // TODO: navigate to login or settings
  };

  const handleChangeCurrentPw = (value: string) => {
    setCurrentPw(value);
    if (currentPwError) {
      setCurrentPwError("");
    }
  };

  const handleChangeNewPw = (value: string) => {
    setNewPw(value);
    if (newPwCheckError) {
      setNewPwCheckError("");
    }
  };

  const handleChangeNewPwCheck = (value: string) => {
    setNewPwCheck(value);
    if (newPwCheckError) {
      setNewPwCheckError("");
    }
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
          currentPwError={currentPwError}
          newPwCheckError={newPwCheckError}
          onChangeCurrentPw={handleChangeCurrentPw}
          onChangeNewPw={handleChangeNewPw}
          onChangeNewPwCheck={handleChangeNewPwCheck}
        />

        <PasswordChangeSuccessModal
          open={successOpen}
          onConfirm={onConfirmSuccess}
        />
      </div>

      <BottomActionBar
        label={isPending ? "변경 중..." : "비밀번호 변경하기"}
        onClick={onSubmit}
        disabled={isPending || !currentPw || !newPw || !newPwCheck || newPw !== newPwCheck}
      />
    </>
  );
}
