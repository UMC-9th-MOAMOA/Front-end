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
    <section className="flex w-[325px] flex-col items-start gap-[20px]">
      {/* 이름(닉네임) */}
      <div className="flex w-[325px] flex-col items-start gap-[10px] self-stretch">
        <span className="body-2 whitespace-nowrap text-[var(--color-black)]">
          이름(닉네임)
        </span>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-[46px] w-full rounded-[12px] bg-[var(--color-gray-100)] px-[15px] py-[8px] text-[var(--color-black)] outline-none"
          placeholder="이름"
        />
      </div>

      {/* 아이디(이메일) */}
      <div className="flex h-[77px] w-[325px] flex-col items-start gap-[10px] self-stretch">
        <span className="body-2 whitespace-nowrap text-[var(--color-black)]">
          아이디(이메일)
        </span>

        <input
          value={initial.email}
          disabled
          className="h-[46px] w-full rounded-[12px] bg-[var(--color-gray-300)] px-[15px] py-[8px] text-[var(--color-gray-700)] outline-none"
        />
      </div>

      {/* 생년월일 */}
      <div className="flex h-[77px] w-[325px] flex-col items-start gap-[10px] self-stretch">
        <span className="body-2 whitespace-nowrap text-[var(--color-black)]">
          생년월일
        </span>

        <input
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="h-[46px] w-full rounded-[12px] bg-[var(--color-gray-100)] px-[15px] py-[8px] text-[var(--color-black)] outline-none"
          placeholder="YYYY.MM.DD"
        />
      </div>

      {/* 성별 */}
      <div className="flex h-[77px] w-[325px] flex-col items-start gap-[10px] self-stretch">
        <span className="body-2 whitespace-nowrap text-[var(--color-black)]">
          성별
        </span>

        {/* 성별 선택 컨테이너 */}
        <div className="relative flex h-[46px] w-[325px] items-center justify-end rounded-[12px] bg-[var(--color-moamoa-50)] px-0 py-[8px]">
          {/* 선택 배경 */}
          <div
            className={[
              "absolute top-0 h-[46px] w-[162px] rounded-[12px] bg-[var(--color-moamoa-200)] transition-transform",
              gender === "남자" ? "left-0" : "right-0",
            ].join(" ")}
          />

          {/* 버튼 영역 */}
          <div className="relative z-10 flex w-full">
            <button
              type="button"
              onClick={() => setGender("남자")}
              className={[
                "body-2 flex h-[46px] w-[162px] items-center justify-center whitespace-nowrap px-[15px] text-center",
                gender === "남자"
                  ? "text-[#FFF]"
                  : "text-[var(--color-moamoa-400)]",
              ].join(" ")}
            >
              남자
            </button>

            <button
              type="button"
              onClick={() => setGender("여자")}
              className={[
                "body-2 flex h-[46px] w-[162px] items-center justify-center whitespace-nowrap px-[15px] text-center",
                gender === "여자"
                  ? "text-[#FFF]"
                  : "text-[var(--color-moamoa-400)]",
              ].join(" ")}
            >
              여자
            </button>
          </div>
        </div>
      </div>

      {/* 휴대폰 */}
      <div className="flex h-[77px] w-[325px] flex-col items-start gap-[10px] self-stretch">
        <span className="body-2 whitespace-nowrap text-[var(--color-black)]">
          휴대폰
        </span>

        {!isPhoneEditing ? (
          <div className="flex w-full items-center gap-[10px]">
            <input
              value={phone}
              disabled
              className="h-[46px] w-[235px] rounded-[12px] bg-[var(--color-gray-100)] px-[15px] py-[8px] text-[var(--color-black)] outline-none"
            />

            <button
              type="button"
              onClick={startPhoneEdit}
              className="flex h-[46px] w-[78px] items-center justify-center rounded-[12px] bg-[var(--color-moamoa-50)] px-[15px] py-[8px]"
            >
              <span className="body-2 whitespace-nowrap text-[var(--color-moamoa-400)]">
                {"변경"}
              </span>
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex w-full items-center gap-[10px]">
              <input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="h-[46px] w-[235px] rounded-[12px] bg-[var(--color-gray-100)] px-[15px] py-[8px] text-[var(--color-black)] outline-none"
                placeholder="-구분없이 입력"
              />

              <button
                type="button"
                className="flex h-[46px] w-[78px] items-center justify-center rounded-[12px] bg-[var(--color-moamoa-50)] px-[15px] py-[8px]"
              >
                <span className="body-2 whitespace-nowrap text-[var(--color-moamoa-400)]">
                  {"인증번호"}
                </span>
              </button>
            </div>

            <div className="flex w-full items-center gap-[10px]">
              <input
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="h-[46px] w-[235px] rounded-[12px] bg-[var(--color-gray-100)] px-[15px] py-[8px] text-[var(--color-black)] outline-none"
                placeholder="인증번호 입력"
              />

              <button
                type="button"
                onClick={confirmPhone}
                className="flex h-[46px] w-[78px] items-center justify-center rounded-[12px] bg-[var(--color-moamoa-50)] px-[15px] py-[8px]"
              >
                <span className="body-2 whitespace-nowrap text-[var(--color-moamoa-400)]">
                  {"확인"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
