import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import type { ApiError } from "@/types/api/api";
import type { ChangePasswordRequest } from "@/types/password/password";
import BottomActionBar from "./components/common/BottomActionBar";
import { useChangePassword } from "./components/Password/hooks/useChangePassword";
import PasswordChangeForm from "./components/Password/PasswordChangeForm";
import PasswordChangeIntro from "./components/Password/PasswordChangeIntro";
import PasswordChangeSuccessModal from "./components/Password/PasswordChangeSuccessModal";

export default function PasswordChangePage() {
  const navigate = useNavigate();
  const [successOpen, setSuccessOpen] = useState(false);
  const { mutate, isPending } = useChangePassword();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm<ChangePasswordRequest>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordCheck: "",
    },
    mode: "onChange",
  });

  const newPassword = useWatch({ control, name: "newPassword" });
  const newPasswordCheck = useWatch({ control, name: "newPasswordCheck" });
  const currentPassword = useWatch({ control, name: "currentPassword" });
  const [serverCurrentPwError, setServerCurrentPwError] = useState("");
  const [serverNewPwCheckError, setServerNewPwCheckError] = useState("");

  useEffect(() => {
    if (newPasswordCheck) {
      trigger("newPasswordCheck");
    }
  }, [newPassword, newPasswordCheck, trigger]);

  useEffect(() => {
    if (!currentPassword) {
      return;
    }
    clearErrors("currentPassword");
    setServerCurrentPwError("");
  }, [currentPassword, clearErrors]);

  useEffect(() => {
    if (newPassword !== newPasswordCheck) {
      if (newPasswordCheck) {
        setError("newPasswordCheck", {
          type: "validate",
          message: "비밀번호가 일치하지 않아요.",
        });
      }
    } else if (newPasswordCheck) {
      clearErrors("newPasswordCheck");
      setServerNewPwCheckError("");
    }
  }, [
    newPassword,
    newPasswordCheck,
    clearErrors,
    setError,
    serverNewPwCheckError,
  ]);

  const onSubmit = handleSubmit((formValues) => {
    mutate(formValues, {
      onSuccess: () => {
        reset();
        setSuccessOpen(true);
      },
      onError: (error) => {
        const apiError = error as ApiError;
        if (apiError.serverCode === "AUTH400_2") {
          setError("currentPassword", {
            type: "server",
            message: "현재 비밀번호가 일치하지 않습니다.",
          });
          setServerCurrentPwError("현재 비밀번호가 일치하지 않습니다.");
          return;
        }
        if (apiError.serverCode === "AUTH400_10") {
          setError("newPasswordCheck", {
            type: "server",
            message: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
          });
          setServerNewPwCheckError(
            "새 비밀번호와 비밀번호 확인이 일치하지 않습니다."
          );
          return;
        }
        if (apiError.serverMessage) {
          setError("currentPassword", {
            type: "server",
            message: apiError.serverMessage,
          });
          setServerCurrentPwError(apiError.serverMessage);
        }
      },
    });
  });

  const onConfirmSuccess = () => {
    setSuccessOpen(false);
    navigate("/settings");
  };

  return (
    <>
      <Header title="비밀번호 변경" property="common" />
      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="w-full bg-white pt-20 pb-28">
        <PasswordChangeIntro />
        <PasswordChangeForm
          control={control}
          errors={errors}
          serverCurrentPwError={serverCurrentPwError}
          serverNewPwCheckError={serverNewPwCheckError}
        />

        <PasswordChangeSuccessModal
          open={successOpen}
          onConfirm={onConfirmSuccess}
        />
      </div>

      <BottomActionBar
        label={isPending ? "변경 중..." : "비밀번호 변경하기"}
        onClick={onSubmit}
        disabled={isPending || !isValid}
      />
    </>
  );
}
