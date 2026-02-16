import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useSocialLogin } from "./hooks/useMutation/useSocialLogin";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate } = useSocialLogin({
    onMessage: (message) => setErrorMessage(message),
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const executedRef = useRef(false);

  useEffect(() => {
    const run = () => {
      const error = searchParams.get("error");
      if (error === "ACCOUNT_BANNED") {
        navigate("/login?error=ACCOUNT_BANNED", { replace: true });
        return;
      }

      const code = searchParams.get("code");
      if (!code) {
        setErrorMessage("소셜 로그인 코드가 없습니다.");
        return;
      }

      if (executedRef.current) {
        return;
      }
      executedRef.current = true;
      mutate({ code });
    };

    run();
  }, [mutate, navigate, searchParams]);

  if (errorMessage) {
    return (
      <div className="flex h-dvh items-center justify-center text-center">
        <p className="body-2 text-gray-600">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex h-dvh items-center justify-center">
      <LoadingSpinner className="size-60" />
    </div>
  );
}
