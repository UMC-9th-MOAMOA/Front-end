import { create } from "zustand";
import type { TermKey } from "@/pages/auth/terms/constants/terms";

export type EmailStatusTone = "success" | "error" | "info";
export type VerifyModalType = "success" | "error" | null;

export type SignUpAgreements = Record<TermKey, boolean>;

interface SignUpStore {
  name: string;
  emailLocal: string;
  emailDomain: string;
  code: string;
  emailVerified: boolean;
  emailLocked: boolean;
  emailStatusText: string;
  emailStatusTone: EmailStatusTone;
  verifyModalType: VerifyModalType;
  verifyModalMessage: string;
  resendCooldown: number;
  showResendCountdown: boolean;
  password: string;
  passwordConfirm: string;
  signUpError: string;
  agreements: SignUpAgreements;
  setName: (value: string) => void;
  setEmailLocal: (value: string) => void;
  setEmailDomain: (value: string) => void;
  setCode: (value: string) => void;
  setEmailVerified: (value: boolean) => void;
  setEmailLocked: (value: boolean) => void;
  setEmailStatusText: (value: string) => void;
  setEmailStatusTone: (value: EmailStatusTone) => void;
  setVerifyModalType: (value: VerifyModalType) => void;
  setVerifyModalMessage: (value: string) => void;
  setResendCooldown: (value: number | ((prev: number) => number)) => void;
  setShowResendCountdown: (value: boolean) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  setSignUpError: (value: string) => void;
  setAgreements: (value: SignUpAgreements) => void;
  reset: () => void;
}

const getInitialAgreements = (): SignUpAgreements => ({
  terms: false,
  privacy: false,
  privacyCollection: false,
  marketing: false,
});

const getInitialState = () => ({
  name: "",
  emailLocal: "",
  emailDomain: "",
  code: "",
  emailVerified: false,
  emailLocked: false,
  emailStatusText: "",
  emailStatusTone: "info" as EmailStatusTone,
  verifyModalType: null as VerifyModalType,
  verifyModalMessage: "인증번호가 잘못 입력되었습니다.",
  resendCooldown: 0,
  showResendCountdown: false,
  password: "",
  passwordConfirm: "",
  signUpError: "",
  agreements: getInitialAgreements(),
});

export const useSignUpStore = create<SignUpStore>((set) => ({
  ...getInitialState(),
  setName: (value) => set({ name: value }),
  setEmailLocal: (value) => set({ emailLocal: value }),
  setEmailDomain: (value) => set({ emailDomain: value }),
  setCode: (value) => set({ code: value }),
  setEmailVerified: (value) => set({ emailVerified: value }),
  setEmailLocked: (value) => set({ emailLocked: value }),
  setEmailStatusText: (value) => set({ emailStatusText: value }),
  setEmailStatusTone: (value) => set({ emailStatusTone: value }),
  setVerifyModalType: (value) => set({ verifyModalType: value }),
  setVerifyModalMessage: (value) => set({ verifyModalMessage: value }),
  setResendCooldown: (value) =>
    set((state) => ({
      resendCooldown:
        typeof value === "function" ? value(state.resendCooldown) : value,
    })),
  setShowResendCountdown: (value) => set({ showResendCountdown: value }),
  setPassword: (value) => set({ password: value }),
  setPasswordConfirm: (value) => set({ passwordConfirm: value }),
  setSignUpError: (value) => set({ signUpError: value }),
  setAgreements: (value) => set({ agreements: value }),
  reset: () => set(getInitialState()),
}));
