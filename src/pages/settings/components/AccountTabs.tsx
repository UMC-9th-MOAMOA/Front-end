import type { AccountTabKey } from "../hooks/useAccountTab";

const tabs: { key: AccountTabKey; label: string }[] = [
  { key: "info", label: "회원정보수정" },
  { key: "password", label: "비밀번호 변경" },
];

export default function AccountTabs({
  activeTab,
  onChange,
}: {
  activeTab: AccountTabKey;
  onChange: (t: AccountTabKey) => void;
}) {
  return (
    <div className="mt-6 flex w-full border-b">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={[
            "flex-1 py-2 text-sm",
            activeTab === t.key
              ? "border-black border-b-2 font-bold text-black"
              : "text-gray-400",
          ].join(" ")}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
