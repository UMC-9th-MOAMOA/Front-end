import { useEffect, useState } from "react";
import type { Gender, UserProfile } from "../../types/settings.type";
import FormField from "../common/FormField";
import GenderToggleField from "./GenderToggleField";
import PhoneField from "./PhoneField";

type Props = {
  initial: UserProfile;
  profileId: string;
  onChangeDraft: (draft: UserProfile) => void;
};

export default function AccountInfoForm({
  initial,
  profileId,
  onChangeDraft,
}: Props) {
  const [name, setName] = useState(initial.name);
  const [birthDate, setBirthDate] = useState(initial.birthDate);
  const [gender, setGender] = useState<Gender>(initial.gender);

  const [phone, setPhone] = useState(initial.phone);
  const [isPhoneEditing, setIsPhoneEditing] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  useEffect(() => {
    setName(initial.name);
    setBirthDate(initial.birthDate);
    setGender(initial.gender);
    setPhone(initial.phone);
  }, [initial.name, initial.birthDate, initial.gender, initial.phone]);

  useEffect(() => {
    onChangeDraft({
      name,
      email: initial.email,
      profileId,
      birthDate,
      gender,
      phone,
    });
  }, [
    name,
    birthDate,
    gender,
    phone,
    initial.email,
    profileId,
    onChangeDraft,
  ]);

  const startPhoneEdit = () => setIsPhoneEditing(true);

  const confirmPhone = () => {
    // TODO(API 연결 시): 인증번호 검증 후 phone 업데이트
    if (!newPhone || !verifyCode) return;
    setPhone(newPhone || phone);
    setIsPhoneEditing(false);
    setNewPhone("");
    setVerifyCode("");
  };

  const requestVerification = () => {
    // TODO(API 연결 시): 인증번호 요청
  };

  return (
    <section className="flex w-full flex-col items-start gap-20">
      <FormField label="이름(닉네임)">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-46 w-full rounded-lg bg-gray-100 px-15 py-8 text-black outline-none"
          placeholder="이름"
        />
      </FormField>

      <FormField label="아이디(이메일)" className="h-77">
        <input
          value={initial.email}
          disabled
          className="h-46 w-full rounded-lg bg-gray-300 px-15 py-8 text-gray-700 outline-none"
        />
      </FormField>

      <FormField label="생년월일" className="h-77">
        <input
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="h-46 w-full rounded-lg bg-gray-100 px-15 py-8 text-black outline-none"
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
          onRequestVerification={requestVerification}
          onConfirm={confirmPhone}
        />
      </FormField>
    </section>
  );
}
