import { useLocation, useNavigate } from "react-router-dom";
import IcChecked from "@/assets/icons/auth/ic_checked.svg";
import IcRight from "@/assets/icons/auth/ic_right-arrow.svg";
import IcUnchecked from "@/assets/icons/auth/ic_unchecked.svg";
import type { TermKey } from "@/pages/auth/terms/constants/terms";
import { useSignUpStore } from "@/store/signup";

interface AgreementItem {
  key: TermKey;
  label: string;
}

const AGREEMENTS: AgreementItem[] = [
  { key: "terms", label: "이용약관 동의(필수)" },
  { key: "privacy", label: "개인정보 취급방침 동의(필수)" },
  { key: "privacyCollection", label: "개인정보 수집 및 이용 동의(필수)" },
  { key: "marketing", label: "마케팅 정보 수신 동의(선택)" },
];

export default function AgreementList() {
  const navigate = useNavigate();
  const location = useLocation();
  const checked = useSignUpStore((state) => state.agreements);
  const setAgreements = useSignUpStore((state) => state.setAgreements);

  const openDetailPage = () => {
    navigate("/terms", {
      state: { from: location.pathname },
    });
  };

  const allChecked = Object.values(checked).every(Boolean);

  const toggleAll = () => {
    const next = !allChecked;
    setAgreements({
      terms: next,
      privacy: next,
      privacyCollection: next,
      marketing: next,
    });
  };

  const toggleItem = (key: TermKey) => {
    setAgreements({
      ...checked,
      [key]: !checked[key],
    });
  };

  return (
    <div>
      <AgreementRow
        label="모두 동의합니다."
        checked={allChecked}
        onToggle={toggleAll}
        showArrow
        onClickArrow={() => openDetailPage()}
      />

      <div className="h-30" />

      <div className="flex flex-col gap-16 px-8">
        {AGREEMENTS.map((item) => (
          <AgreementRow
            key={item.key}
            label={item.label}
            checked={checked[item.key]}
            onToggle={() => toggleItem(item.key)}
          />
        ))}
      </div>
    </div>
  );
}

interface AgreementRowProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onClickArrow?: () => void;
  showArrow?: boolean;
}

function AgreementRow({
  label,
  checked,
  onToggle,
  onClickArrow,
  showArrow = false,
}: AgreementRowProps) {
  return (
    <div className="flex items-center justify-between">
      {/* 체크 영역 */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className="flex cursor-pointer items-center gap-8 border-none bg-transparent"
      >
        <img
          src={checked ? IcChecked : IcUnchecked}
          alt=""
          className="h-16 w-16"
        />
        <span className="body-4">{label}</span>
      </button>

      {/* 화살표 */}
      {showArrow && (
        <button
          type="button"
          onClick={onClickArrow}
          aria-label={`${label} 상세 보기`}
          className="flex cursor-pointer items-center border-none bg-transparent p-0"
        >
          <img src={IcRight} alt="" />
        </button>
      )}
    </div>
  );
}
