export default function PasswordChangeIntro() {
  return (
    <>
      {/* 구분선 393 x 2 */}
      <div className="mt-14 h-2 w-full bg-[var(--color-gray-200)]" />

      {/* 안내 문구 */}
      <div className="mt-95 flex w-full flex-col items-center gap-34">
        <p className="heading-3 whitespace-nowrap text-warning">
          새로운 비밀번호를 입력해주세요
        </p>
      </div>

    </>
  );
}
