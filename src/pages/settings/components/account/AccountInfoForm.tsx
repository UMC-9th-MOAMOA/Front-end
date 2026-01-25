import { useState } from "react";
import FormField from "../common/FormField";
import GenderToggleField from "./GenderToggleField";
import PhoneField from "./PhoneField";
import type { Gender, UserProfile } from "../../types/settings.type";

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
    <section className="flex w-full flex-col items-start gap-20">
      <FormField label="이름(닉네임)">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-46 w-full rounded-lg bg-[var(--color-gray-100)] px-15 py-8 text-[var(--color-black)] outline-none"
          placeholder="이름"
        />
      </FormField>

      <FormField label="아이디(이메일)" className="h-77">
        <input
          value={initial.email}
          disabled
          className="h-46 w-full rounded-lg bg-[var(--color-gray-300)] px-15 py-8 text-[var(--color-gray-700)] outline-none"
        />
      </FormField>

      <FormField label="생년월일" className="h-77">
        <input
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="h-46 w-full rounded-lg bg-[var(--color-gray-100)] px-15 py-8 text-[var(--color-black)] outline-none"
          placeholder="YYYY.MM.DD"
        />
      </FormField>

      <FormField label="성별" className="h-77">
        <GenderToggleField value={gender} onChange={setGender} />
      </FormField>

      <FormField label="휴대폰" className="h-77">
        <PhoneField
          value={phone}
          isEditing={isPhoneEditing}
          newValue={newPhone}
          verifyCode={verifyCode}
          onStartEdit={startPhoneEdit}
          onChangeNewValue={setNewPhone}
          onChangeVerifyCode={setVerifyCode}
          onConfirm={confirmPhone}
        />
      </FormField>
    </section>
  );
}
