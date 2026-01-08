import type { MyPageTopTabKey } from "../types/mypage.type";

const tabs: { key: MyPageTopTabKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "mission", label: "내 미션" },
  { key: "acorn", label: "내 도토리" },
];

type Props = {
  activeTab: MyPageTopTabKey;
  onChange: (tab: MyPageTopTabKey) => void;
};

export default function MyPageTabs({ activeTab, onChange }: Props) {
  return (
    <div className="mt-6 flex w-full justify-between border-b">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={[
            "flex-1 py-2 text-sm",
            activeTab === tab.key
              ? "border-black border-b-2 font-bold text-black"
              : "text-gray-400",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
