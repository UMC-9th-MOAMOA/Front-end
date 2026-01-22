import { useState } from "react";
import Logo from "@/assets/LOGO.svg";
import { Button } from "@/components/common/button/Button";
import AuthHeader from "../components/AuthHeader";
import { AuthTextField } from "../components/AuthTextField";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col">
      <AuthHeader title="비밀번호 재설정" />
      <img
        src={Logo}
        alt="모아모아 로고"
        className="mx-auto mt-43 block h-auto w-193"
      />
      <h1 className="heading-3 mt-116 text-center text-black">
        가입하신 이메일 주소를 입력해주세요
      </h1>
      <div className="mt-16">
        <AuthTextField
          name="email"
          placeholder="이메일 주소를 입력해주세요"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          width="full"
          variant="outlined"
        />
      </div>
      <Button type="submit" variant="primary" size="full" className="mt-74">
        인증 메일 보내기
      </Button>
      <p className="body-4 mt-20 text-center text-gray-500">
        <span>인증 메일이 오지 않나요?</span>
        <span className="block">스팸함을 확인하거나 재발송을 요청하세요.</span>
      </p>
    </div>
  );
}
