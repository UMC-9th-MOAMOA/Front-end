import GoogleIcon from "@/assets/icons/auth/ic_google.svg";
import KakaoIcon from "@/assets/icons/auth/ic_kakao.svg";

export default function SocialLoginButtons() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/social/google`;
  };
  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/social/kakao`;
  };

  return (
    <div className="flex flex-col gap-18">
      <div className="flex items-center gap-11">
        <div className="h-px w-full bg-gray-500" />
        <span className="body-5 whitespace-nowrap text-gray-600">
          SNS 계정으로 로그인
        </span>
        <div className="h-px w-full bg-gray-500" />
      </div>

      <div className="flex justify-center gap-19">
        <button
          type="button"
          className="flex h-36 w-36 items-center justify-center gap-8"
          onClick={handleKakaoLogin}
        >
          <img src={KakaoIcon} alt="카카오 로그인" className="h-36 w-36" />
        </button>
        <button
          type="button"
          className="flex h-36 w-36 items-center justify-center gap-8"
          onClick={handleGoogleLogin}
        >
          <img src={GoogleIcon} alt="구글 로그인" className="h-36 w-36" />
        </button>
      </div>
    </div>
  );
}
