import FormField from "../common/FormField";

type Props = {
  currentPw: string;
  newPw: string;
  newPwCheck: string;
  onChangeCurrentPw: (value: string) => void;
  onChangeNewPw: (value: string) => void;
  onChangeNewPwCheck: (value: string) => void;
};

export default function PasswordChangeForm({
  currentPw,
  newPw,
  newPwCheck,
  onChangeCurrentPw,
  onChangeNewPw,
  onChangeNewPwCheck,
}: Props) {
  return (
    <section className="flex h-224 w-full flex-col items-start gap-40">
      <FormField label="기존 비밀번호" className="h-77">
        <input
          type="password"
          value={currentPw}
          onChange={(e) => onChangeCurrentPw(e.target.value)}
          placeholder="기존 비밀번호를 입력해주세요"
          className="h-46 w-full rounded-lg bg-gray-100 px-15 py-8 text-gray-500 outline-none"
        />
      </FormField>

      <div className="flex w-full flex-col gap-10">
        <FormField label="새 비밀번호" className="h-77">
          <input
            type="password"
            value={newPw}
            onChange={(e) => onChangeNewPw(e.target.value)}
            placeholder="비밀번호"
            className="h-46 w-full rounded-lg bg-gray-100 px-15 py-8 text-gray-500 outline-none"
          />
        </FormField>

        <FormField label="새 비밀번호 확인" className="h-99">
          <div className="flex w-full flex-col gap-6">
            <input
              type="password"
              value={newPwCheck}
              onChange={(e) => onChangeNewPwCheck(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className="h-46 w-full rounded-lg bg-gray-100 px-15 py-8 text-gray-500 outline-none"
            />

            <p className="body-5 whitespace-nowrap text-gray-600">
              영문 숫자 특수문자 포함 8자리 이상 입력해주세요
            </p>
          </div>

          {/* TODO(API 연결 시): 유효성 검사/에러 메시지 노출 */}
        </FormField>
      </div>
    </section>
  );
}
