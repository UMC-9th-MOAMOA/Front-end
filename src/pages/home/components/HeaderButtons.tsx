import type { ForwardedRef } from "react";
import { useNavigate } from "react-router-dom";
import BoomerangIcon from "@/assets/icons/home/ic_boomerang.svg?react";
import AcornIcon from "@/assets/icons/ic_acorn.svg?react";
import PocketIcon from "@/assets/icons/home/ic_pocket.svg?react";
import MoaToggle from "@/pages/settings/components/common/Moatoggle";

interface HeaderButtonsProps {
  acornCount: number;
  acornRef?: ForwardedRef<HTMLDivElement>;
  pocketRef?: ForwardedRef<HTMLButtonElement>;
  boomerangRef?: ForwardedRef<HTMLButtonElement>;
  bgmEnabled: boolean;
  onBgmToggle: (enabled: boolean) => void;
}

const HeaderButtons = ({
  acornCount,
  acornRef,
  pocketRef,
  boomerangRef,
  bgmEnabled,
  onBgmToggle,
}: HeaderButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between px-7 pt-42">
      <div className="flex flex-col">
        <div className="flex items-center gap-10">
          <span className="body-3 text-moamoa-300">배경음악</span>
          <MoaToggle checked={bgmEnabled} onCheckedChange={onBgmToggle} />
        </div>
        <div
          ref={acornRef}
          className="mt-9 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-15.5 py-4"
        >
          <AcornIcon className="h-24 w-24" />
          <span className="body-4 text-black">{acornCount}</span>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <button
          ref={pocketRef}
          type="button"
          className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-11"
          onClick={() => navigate("/pocket")}
        >
          <PocketIcon className="h-40 w-40" />
        </button>
        <button
          ref={boomerangRef}
          type="button"
          className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-11"
          onClick={() => navigate("/mypage?tab=mission&view=retry")}
        >
          <BoomerangIcon className="h-40 w-40" />
        </button>
      </div>
    </div>
  );
};

export default HeaderButtons;
