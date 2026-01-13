import GoogleIcon from "@/assets/icons/auth/ic_google.svg";
import KakaoIcon from "@/assets/icons/auth/ic_kakao.svg";

export default function SocialLoginButtons() {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex items-center gap-6">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="body-4 text-gray-600">SNS 계정으로 로그인</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>
      <div className="flex justify-center gap-16">
        <button
          type="button"
          className="flex h-36 w-36 items-center justify-center gap-8"
        >
          <img src={KakaoIcon} alt="카카오 로그인" className="h-36 w-36" />
        </button>
        <button
          type="button"
          className="flex h-36 w-36 items-center justify-center gap-8"
        >
          <img src={GoogleIcon} alt="구글 로그인" className="h-36 w-36" />
        </button>
      </div>
    </div>
  );
}
