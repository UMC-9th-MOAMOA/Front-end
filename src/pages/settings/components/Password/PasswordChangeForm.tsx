import { useState } from "react";
import FormField from "../common/FormField";

export default function PasswordChangeForm() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  return (
    <section className="flex h-224 w-full flex-col items-start gap-48">
      {/* 새 비밀번호 (326 x 77 느낌이지만 폭 기준은 325로 통일) */}
      <FormField label="새 비밀번호" className="h-77">
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
          className="h-46 w-full rounded-lg bg-[var(--color-gray-100)] px-15 py-8 text-gray-500 outline-none"
        />
      </FormField>

      {/* 새 비밀번호 확인 (325 x 99) */}
      <FormField label="새 비밀번호 확인" className="h-99">
        <input
          type="password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className="h-46 w-full rounded-lg bg-[var(--color-gray-100)] px-15 py-8 text-gray-500 outline-none"
        />

        {/* 입력 박스 아래 6 */}
        <p className="body-5 mt-6 whitespace-nowrap text-gray-600">
          영문 숫자 특수문자 포함 8자리 이상 입력해주세요
        </p>

        {/* TODO(API 연결 시): 유효성 검사/에러 메시지 노출 */}
        {/* 에러 문구까지 Figma 스펙 나오면 그 위치/색/폰트로 맞추면 됨 */}
      </FormField>
    </section>
  );
}
