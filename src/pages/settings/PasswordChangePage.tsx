import { useState } from "react";
import Header from "@/components/common/header/Header";
import PasswordChangeForm from "./components/PasswordChangeForm";
import PasswordChangeSuccessModal from "./components/PasswordChangeSuccessModal";

export default function PasswordChangePage() {
  const [saving, setSaving] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const onSubmit = async () => {
    // TODO(API 연결 시): PATCH /users/password
    setSaving(true);
    try {
      console.log("submit password change");

      // 임시: 성공 처리
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
    <div className="w-full">
      <Header title="비밀번호 변경" property="common" />

      <div className="flex w-full flex-col items-center">
        {/* 헤더 아래 14 */}
        <div className="h-[14px]" />

        {/* 구분선 393 x 2 */}
        <div className="h-[2px] w-[393px] bg-[var(--color-gray-200)]" />

        {/* 구분선 아래 95 */}
        <div className="h-[95px]" />

        {/* 안내 문구 */}
        <div className="flex w-[325px] flex-col items-center gap-[34px]">
          <p className="heading-3 whitespace-nowrap text-[var(--color-warning)]">
            새로운 비밀번호를 입력해주세요
          </p>
        </div>

        {/* 문구 아래 47 */}
        <div className="h-[47px]" />

        {/* 비밀번호 입력 폼 */}
        <PasswordChangeForm />

        {/* helper 문구 아래 217 */}
        <div className="h-[217px]" />

        {/* 변경 버튼 */}
        <button
          type="button"
          disabled={saving}
          onClick={onSubmit}
          className={[
            "flex h-[46px] w-[325px] items-center justify-center",
            "rounded-[12px]",
            "bg-[var(--color-moamoa-300)]",
            "heading-5 whitespace-nowrap text-[var(--color-white)]",
            "active:bg-[var(--color-moamoa-500)]",
            "disabled:pointer-events-none disabled:opacity-50",
          ].join(" ")}
        >
          비밀번호 변경하기
        </button>
      </div>

      {/* 성공 모달 */}
      <PasswordChangeSuccessModal
        open={successOpen}
        onConfirm={onConfirmSuccess}
      />
    </div>
  );
}
