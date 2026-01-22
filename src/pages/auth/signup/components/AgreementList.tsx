import { useState } from "react";
import IcChecked from "@/assets/icons/auth/ic_checked.svg";
import IcUnchecked from "@/assets/icons/auth/ic_unchecked.svg";
import IcRight from "@/assets/icons/ic_right.svg";

type AgreementKey = "terms" | "privacy" | "marketing";

interface AgreementItem {
  key: AgreementKey;
  label: string;
}

const AGREEMENTS: AgreementItem[] = [
  { key: "terms", label: "이용약관 동의" },
  { key: "privacy", label: "개인정보 취급방침 동의" },
  { key: "marketing", label: "마케팅 정보 수신 동의" },
];

export default function AgreementList() {
  const [checked, setChecked] = useState<Record<AgreementKey, boolean>>({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const allChecked = Object.values(checked).every(Boolean);

  const toggleAll = () => {
    const next = !allChecked;
    setChecked({ terms: next, privacy: next, marketing: next });
  };

  const toggleItem = (key: AgreementKey) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openDetailModal = (key: AgreementKey) => {
    console.log(`${key} 상세 모달 열기`);
  };

  return (
    <div>
      <AgreementRow
        label="모두 동의합니다."
        checked={allChecked}
        onToggle={toggleAll}
      />

      <div className="h-30" />

      <div className="flex flex-col gap-16 px-8">
        {AGREEMENTS.map((item) => (
          <AgreementRow
            key={item.key}
            label={item.label}
            checked={checked[item.key]}
            onToggle={() => toggleItem(item.key)}
            onClickArrow={() => openDetailModal(item.key)}
            showArrow
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
