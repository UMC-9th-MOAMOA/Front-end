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
    <div className="w-full">
      {/* 탭 버튼 영역 */}
      <div className="flex justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={[
              "inline-flex items-center justify-center whitespace-nowrap px-34 py-10 text-sm",
              activeTab === tab.key
                ? "border-black border-b-1 font-bold text-black"
                : "text-gray-400",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 기본 연한 선 (전체 폭) */}
      <div className="-mx-25 h-px bg-gray-200" />
    </div>
  );
}
