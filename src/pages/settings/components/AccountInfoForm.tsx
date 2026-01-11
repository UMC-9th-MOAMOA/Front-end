import { useState } from "react";
import type { Gender, UserProfile } from "../types/settings.type";

export default function AccountInfoForm({ initial }: { initial: UserProfile }) {
  const [name, setName] = useState(initial.name);
  const [birthDate, setBirthDate] = useState(initial.birthDate);
  const [gender, setGender] = useState<Gender>(initial.gender);

  const [phone, setPhone] = useState(initial.phone);
  const [isPhoneEditing, setIsPhoneEditing] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const startPhoneEdit = () => setIsPhoneEditing(true);

  const confirmPhone = () => {
    // TODO(API 연결 시): 인증번호 검증 후 phone 업데이트
    console.log("confirm phone:", newPhone, verifyCode);
    setPhone(newPhone || phone);
    setIsPhoneEditing(false);
    setNewPhone("");
    setVerifyCode("");
  };

  return (
    <section className="mt-6">
      {/* 이름 */}
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 text-sm">
          이름
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none"
          placeholder="이름"
        />
      </div>

      {/* 아이디(이메일) - 변경 불가 */}
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 text-sm">
          아이디 (이메일)
        </label>
        <input
          value={initial.email}
          disabled
          className="mt-2 w-full rounded-xl bg-gray-200 px-4 py-3 text-gray-500 text-sm outline-none"
        />
      </div>

      {/* 생년월일 */}
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 text-sm">
          생년월일
        </label>
        <input
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="mt-2 w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none"
          placeholder="YYYY.MM.DD"
        />
      </div>

      {/* 성별 */}
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 text-sm">
          성별
        </label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setGender("남자")}
            className={[
              "rounded-xl py-3 font-semibold text-sm",
              gender === "남자"
                ? "bg-blue-300 text-white"
                : "bg-gray-100 text-gray-500",
            ].join(" ")}
          >
            남자
          </button>
          <button
            type="button"
            onClick={() => setGender("여자")}
            className={[
              "rounded-xl py-3 font-semibold text-sm",
              gender === "여자"
                ? "bg-blue-300 text-white"
                : "bg-gray-100 text-gray-500",
            ].join(" ")}
          >
            여자
          </button>
        </div>
      </div>

      {/* 휴대폰 */}
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 text-sm">
          휴대폰
        </label>

        <div className="mt-2 flex items-center gap-3">
          <input
            value={phone}
            disabled
            className="flex-1 rounded-xl bg-gray-50 px-4 py-3 text-gray-700 text-sm outline-none"
          />
          <button
            type="button"
            onClick={startPhoneEdit}
            className="rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-600 text-sm active:bg-blue-100"
          >
            변경
          </button>
        </div>

        {isPhoneEditing && (
          <div className="mt-4 space-y-3 rounded-2xl bg-gray-50 p-4">
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 text-sm outline-none"
              placeholder="새 휴대폰 번호 입력"
            />
            <input
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 text-sm outline-none"
              placeholder="인증번호 입력"
            />

            <button
              type="button"
              onClick={confirmPhone}
              className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white active:bg-blue-600"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
