import type { MyPageTopTabKey } from "../types/mypage.type";
import { Button } from "@/components/common/button/Button";

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
      <div className="flex w-full">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={[
              "inline-flex min-w-0 flex-1 items-center justify-center whitespace-nowrap px-34 py-10 text-sm",
              activeTab === tab.key
                ? "border-black border-b-1 font-bold text-black"
                : "text-gray-400",
            ].join(" ")}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="-mx-25 h-px bg-gray-200" />
    </div>
  );
}
