import { useState } from "react";
import IcCheck from "@/assets/icons/ic_check.svg?react";
import { Button } from "@/components/common/button/Button";
import Header from "@/components/common/header/Header";
import BottomActionBar from "@/pages/settings/components/common/BottomActionBar";

export default function InquiryConsentPage() {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-white">
      <Header title="이용 약관 동의" property="common" />

      <div className="-mx-[25px] mt-[14px] h-[2px] bg-gray-200" />

      <div className="flex min-h-0 w-full flex-1 flex-col items-center overflow-hidden">
        <div className="mt-[34px] w-full">
          <Button
            type="button"
            onClick={() => setIsAgreed((prev) => !prev)}
            className={[
              "inline-flex w-full items-center justify-start rounded-[12px] py-[14px] pr-[116px] pl-[17px]",
              isAgreed ? "bg-moamoa-50" : "bg-gray-100",
            ].join(" ")}
          >
            <IcCheck
              className="h-[24px] w-[24px]"
              style={{
                color: isAgreed
                  ? "var(--color-positive, #2664ED)"
                  : "var(--color-gray-500, #9E9E9E)",
              }}
              aria-hidden
            />
            <span className="body-2 ml-[75px] whitespace-nowrap text-black">
              네, 동의합니다
            </span>
          </Button>
        </div>

        <div className="mt-[34px] flex min-h-0 w-full flex-1 flex-col items-start gap-[13px] pb-[140px]">
          <div className="flex items-center">
            <IcCheck
              className="h-[24px] w-[24px]"
              style={{
                color: isAgreed
                  ? "var(--color-positive, #2664ED)"
                  : "var(--color-gray-500, #9E9E9E)",
              }}
              aria-hidden
            />
            <span className="heading-6 ml-[7px] text-black">
              개인정보 수집 및 이용 동의
            </span>
            <span className="body-2 ml-[6px] text-moamoa-400">(필수)</span>
          </div>

          <div className="flex max-h-[456px] min-h-0 w-full flex-1 flex-col items-start justify-start overflow-y-auto rounded-[12px] border border-gray-400 bg-white px-[15px] pt-[15px] pb-[15px]">
            <div className="body-4 w-full whitespace-pre-line text-gray-700">
              (주)모아모아는 서비스 제공을 위하여
              {"\n"}아래와 같이 개인정보를 수집·이용하고자 합니다.
              {"\n"}내용을 자세히 읽으신 후 동의해 주시기 바랍니다.
              {"\n\n"}1. 수집 및 이용 목적
              {"\n"}• 회원 가입 및 관리: 본인 식별, 회원 자격 유지, 서비스 이용
              의사 확인
              {"\n"}• 서비스 제공: 미션 수행 기록 저장, 리워드(도토리) 적립 및
              사용
              {"\n"}• 부정 이용 방지: 비정상적인 미션 수행(매크로 등) 탐지 및
              제재
              {"\n\n"}2. 수집하는 항목
              {"\n"}• (필수) 이메일, 비밀번호, 닉네임
              {"\n"}• (필수 ·자동수집) 기기식별값(ADID/IDFA), 서비스 이용 기록,
              접속 로그
              {"\n"}
              {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}• ※
              기기식별값은 중복 가입 및 보상 부정 수급 방지를 위해 필수적으로
              수집합니다.
              {"\n\n"}3. 보유 및 이용 기간
              {"\n"}• 회원 탈퇴 시까지
              {"\n"}• 단, 부정 이용 방지를 위해 기기식별값 및 불량 이용 기록은
              탈퇴 후 1년간 보관 후 파기합니다.
              {"\n\n"}4. 동의를 거부할 권리
              {"\n"}• 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가
              있습니다.
              {"\n"}• 단, 동의를 거부할 경우 회원가입 및 미션 수행, 보상 지급 등
              서비스 이용이 불가능합니다.
            </div>
          </div>
        </div>
      </div>

      <BottomActionBar
        label="동의합니다"
        onClick={() => setIsAgreed((prev) => !prev)}
        buttonClassName={isAgreed ? "bg-moamoa-300" : "bg-gray-300"}
      />
    </div>
  );
}
