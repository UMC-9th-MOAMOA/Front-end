import { useState } from "react";

export default function PasswordChangeForm() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  return (
    <section className="flex h-[224px] w-[325px] flex-col items-start gap-[48px]">
      {/* 새 비밀번호 (326 x 77 느낌이지만 폭 기준은 325로 통일) */}
      <div className="flex h-[77px] w-[325px] flex-col items-start gap-[10px] self-stretch">
        <span className="body-2 whitespace-nowrap text-[var(--color-black)]">
          새 비밀번호
        </span>

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
          className="h-[46px] w-full rounded-[12px] bg-[var(--color-gray-100)] px-[15px] py-[8px] text-[var(--color-gray-500)] outline-none"
        />
      </div>

      {/* 새 비밀번호 확인 (325 x 99) */}
      <div className="flex h-[99px] w-[325px] flex-col items-start gap-[10px] self-stretch">
        <span className="body-2 whitespace-nowrap text-[var(--color-black)]">
          새 비밀번호 확인
        </span>

        <input
          type="password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className="h-[46px] w-full rounded-[12px] bg-[var(--color-gray-100)] px-[15px] py-[8px] text-[var(--color-gray-500)] outline-none"
        />

        {/* 입력 박스 아래 6 */}
        <p className="body-5 mt-[6px] whitespace-nowrap text-[var(--color-gray-600)]">
          영문 숫자 특수문자 포함 8자 이상 입력해주세요
        </p>

        {/* TODO(API 연결 시): 유효성 검사/에러 메시지 노출 */}
        {/* 에러 문구까지 Figma 스펙 나오면 그 위치/색/폰트로 맞추면 됨 */}
      </div>
    </section>
  );
}
