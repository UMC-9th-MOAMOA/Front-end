import { useState } from "react";
import { Button } from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import PasswordChangeForm from "./components/Password/PasswordChangeForm";
import PasswordChangeIntro from "./components/Password/PasswordChangeIntro";
import PasswordChangeSuccessModal from "./components/Password/PasswordChangeSuccessModal";

export default function PasswordChangePage() {
  const [saving, setSaving] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const onSubmit = async () => {
    // TODO(API 연결 시): PATCH /users/password
    setSaving(true);
    try {
      console.log("submit password change");

      setSuccessOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const onConfirmSuccess = () => {
    setSuccessOpen(false);
    // TODO: 로그인 페이지로 이동 or 설정 페이지로 이동
    // navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="비밀번호 변경" property="common" />

      <div className="flex w-full flex-1 flex-col items-center">
        <PasswordChangeIntro />
        <PasswordChangeForm />

        <div className="h-217" />

        <Button
          type="button"
          disabled={saving}
          onClick={onSubmit}
          className={[
            "flex h-46 w-full items-center justify-center",
            "rounded-lg",
            "bg-[var(--color-moamoa-300)]",
            "heading-5 whitespace-nowrap text-[var(--color-white)]",
            "active:bg-[var(--color-moamoa-500)]",
            "disabled:pointer-events-none disabled:bg-[var(--color-moamoa-300)] disabled:text-[var(--color-white)] disabled:opacity-50",
          ].join(" ")}
        >
          비밀번호 변경하기
        </Button>
      </div>

      <PasswordChangeSuccessModal
        open={successOpen}
        onConfirm={onConfirmSuccess}
      />
    </div>
  );
}
