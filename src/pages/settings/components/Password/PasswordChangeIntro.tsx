export default function PasswordChangeIntro() {
  return (
    <>
      {/* 헤더 아래 14 */}
      <div className="h-14" />

      {/* 구분선 393 x 2 */}
      <div className="h-2 w-full bg-[var(--color-gray-200)]" />

      {/* 구분선 아래 95 */}
      <div className="h-95" />

      {/* 안내 문구 */}
      <div className="flex w-full flex-col items-center gap-34">
        <p className="heading-3 whitespace-nowrap text-[var(--color-warning)]">
          새로운 비밀번호를 입력해주세요
        </p>
      </div>

      {/* 문구 아래 47 */}
      <div className="h-47" />
    </>
  );
}
