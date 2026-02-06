import { Button } from "@/components/common/button/Button";

type LogoutActionProps = {
  onLogout: () => void;
};

type WithdrawActionProps = {
  onWithdraw: () => void;
};

export function LogoutAction({ onLogout }: LogoutActionProps) {
  return (
    <div className="flex flex-col items-center">
      <Button
        type="button"
        className="body-2 flex h-44 w-126 flex-col items-center justify-center gap-4 rounded-lg bg-moamoa-50 px-16 py-10 text-moamoa-600"
        onClick={onLogout}
      >
        로그아웃
      </Button>
    </div>
  );
}

export function WithdrawAction({ onWithdraw }: WithdrawActionProps) {
  return (
    <div className="mb-61 flex flex-col items-center">
      <p className="body-2 mt-25 mb-16 text-warning">정말 탈퇴하시겠어요?</p>

      <Button
        type="button"
        // TODO(design-token): replace bg-[#FFE4E4] with a color token when available.
        className="body-2 flex h-44 w-126 flex-col items-center justify-center gap-4 rounded-lg bg-[#FFE4E4] px-16 py-10 text-warning"
        onClick={onWithdraw}
      >
        회원 탈퇴
      </Button>
    </div>
  );
}
