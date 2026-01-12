import { useState } from "react";
import EyeOffIcon from "@/assets/icons/auth/ic_eye-off.svg?react";
import EyeOnIcon from "@/assets/icons/auth/ic_eye-on.svg?react";
import type { AuthTextFieldProps } from "../../components/AuthTextField";
import { AuthTextField } from "../../components/AuthTextField";

type PasswordTextFieldProps = Omit<AuthTextFieldProps, "type" | "endAdornment">;

export function PasswordTextField(props: PasswordTextFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AuthTextField
      {...props}
      type={isVisible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          className="grid h-32 w-32 place-items-center"
          aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
          onMouseDown={(e) => e.preventDefault()}
        >
          <span className="h-24 w-24">
            {isVisible ? <EyeOnIcon /> : <EyeOffIcon />}
          </span>
        </button>
      }
    />
  );
}
