import { useState } from "react";
import Header from "@/components/common/header/Header";
import BottomActionBar from "./components/common/BottomActionBar";
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
  };

  return (
    <div className="flex h-714 w-full flex-col overflow-hidden pb-98">
      <Header title="비밀번호 변경" property="common" />

      <div className="flex w-full flex-1 flex-col items-center">
        <PasswordChangeIntro />
        <div className="mt-47 w-full">
          <PasswordChangeForm />
        </div>
      </div>

      <PasswordChangeSuccessModal
        open={successOpen}
        onConfirm={onConfirmSuccess}
      />

      <BottomActionBar label="비밀번호 변경하기" onClick={onSubmit} />
    </div>
  );
}
