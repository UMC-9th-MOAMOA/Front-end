import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DividerIcon from "@/assets/icons/auth/ic_divider.svg?react";
import { Button } from "@/components/common/button/Button";
import { AuthTextField } from "../../components/AuthTextField";
import { Modal } from "../../components/Modal";
import { PasswordTextField } from "../../components/PasswordTextField";
import { useLogin } from "../hooks/useMutation/useLogin";
import { useRecoverAccount } from "../hooks/useMutation/useRecoverAccount";

function AuthLinksRow() {
  return (
    <div className="flex items-center justify-center gap-16 text-gray-600 text-sm">
      <Link to="/password" className="hover:underline">
        비밀번호 찾기
      </Link>
      <DividerIcon className="h-18 w-1" aria-hidden="true" />
      <Link to="/signup" className="text-black">
        회원가입
      </Link>
    </div>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [blockedCode, setBlockedCode] = useState<
    "AUTH403_2" | "AUTH403_3" | ""
  >("");
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: loginMutate, isPending } = useLogin({
    onBlocked: (code) => {
      setBlockedCode(code);
      setIsBlockedModalOpen(true);
      setErrorMessage("");
    },
    onMessage: (message) => setErrorMessage(message),
  });
  const { mutate: recoverMutate, isPending: isRecovering } = useRecoverAccount({
    onSuccess: () => {
      setIsBlockedModalOpen(false);
    },
    onMessage: (message) => setErrorMessage(message),
  });

  const canSubmit =
    email.trim().length > 0 && password.trim().length > 0 && !isPending;

  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "ACCOUNT_BANNED") {
      setBlockedCode("AUTH403_3");
      setIsBlockedModalOpen(true);
      setSearchParams((prev) => {
        const nextParams = new URLSearchParams(prev);
        nextParams.delete("error");
        return nextParams;
      }, { replace: true });
    }
  }, [error, setSearchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    setErrorMessage("");
    setBlockedCode("");
    setIsBlockedModalOpen(false);

    loginMutate({ email, password });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-20">
        <AuthTextField
          name="email"
          placeholder="이메일 주소를 입력해주세요"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          width="full"
          variant="outlined"
        />
        <PasswordTextField
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width="full"
          variant="outlined"
        />
      </div>
      <div className="text-center">
        {errorMessage ? (
          <p className="body-4 text-red-500">{errorMessage}</p>
        ) : null}
      </div>
      <Button
        type="submit"
        className="heading-5 mt-58 mb-26 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-800"
        disabled={!canSubmit}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
      <AuthLinksRow />
      <Modal
        open={isBlockedModalOpen}
        onClose={() => setIsBlockedModalOpen(false)}
      >
        <div className="flex flex-col items-center text-center">
          {blockedCode === "AUTH403_2" ? (
            <>
              <p className="heading-3 text-moamoa-400">
                복구 가능한 계정이 존재해요
              </p>
              <p className="body-2 mt-20 text-gray-600">
                기존 계정을 복구 하시겠어요?
              </p>
              <div className="mt-32 flex w-full gap-12">
                <Button
                  type="button"
                  className="body-2 h-50 w-full rounded-lg bg-moamoa-50 text-moamoa-600 active:bg-moamoa-100"
                  onClick={() => setIsBlockedModalOpen(false)}
                >
                  닫기
                </Button>
                <Button
                  type="button"
                  className="body-2 h-50 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
                  onClick={() => {
                    if (isRecovering) return;
                    setErrorMessage("");
                    recoverMutate({ email, password });
                  }}
                >
                  {isRecovering ? "복구 중..." : "복구하기"}
                </Button>
              </div>
            </>
          ) : blockedCode === "AUTH403_3" ? (
            <>
              <p className="heading-3 text-black">
                서비스 이용이
                <br />
                정지된 계정입니다.
              </p>
              <Button
                type="button"
                className="body-2 h-50 w-154 rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
                onClick={() => setIsBlockedModalOpen(false)}
              >
                확인
              </Button>
            </>
          ) : null}
        </div>
      </Modal>
    </form>
  );
}
