import GoogleIcon from "../../../../assets/icons/GoogleIcon.svg";
import KakaoIcon from "../../../../assets/icons/KakaoIcon.svg";

export default function SocialLoginButtons() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="body-4 text-gray-600">SNS 계정으로 로그인</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center gap-2"
        >
          <img src={KakaoIcon} alt="카카오 로그인" className="h-9 w-9" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center gap-2"
        >
          <img src={GoogleIcon} alt="구글 로그인" className="h-9 w-9" />
        </button>
      </div>
    </div>
  );
}
