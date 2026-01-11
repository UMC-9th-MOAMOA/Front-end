import { useState } from "react";

export default function PasswordChangeForm() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  return (
    <section className="mt-6">
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 text-sm">
          새 비밀번호
        </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-2 w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none"
          placeholder="새 비밀번호"
        />
      </div>

      <div className="mb-3">
        <label className="block font-semibold text-gray-700 text-sm">
          새 비밀번호 확인
        </label>
        <input
          type="password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          className="mt-2 w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none"
          placeholder="새 비밀번호 확인"
        />
      </div>

      <p className="text-gray-400 text-xs">
        영문, 숫자, 특수문자 포함 8글자 이상 입력해주세요.
      </p>

      {/* TODO(API 연결 시): 유효성 검사/에러 메시지 노출 */}
      {pw2.length > 0 && pw !== pw2 && (
        <p className="mt-2 text-red-500 text-xs">
          비밀번호가 일치하지 않습니다.
        </p>
      )}
    </section>
  );
}
