import type { ForwardedRef } from "react";
import { useNavigate } from "react-router-dom";
import BigAcornIcon from "@/assets/icons/ic_big_acorn.svg?react";
import BoomerangIcon from "@/assets/icons/ic_boomerang.svg?react";
import PocketIcon from "@/assets/icons/ic_pocket.svg?react";

interface HeaderButtonsProps {
  acornCount: number;
  acornRef?: ForwardedRef<HTMLDivElement>;
  pocketRef?: ForwardedRef<HTMLButtonElement>;
  boomerangRef?: ForwardedRef<HTMLButtonElement>;
}

const HeaderButtons = ({
  acornCount,
  acornRef,
  pocketRef,
  boomerangRef,
}: HeaderButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between px-7 pt-42">
      <div
        ref={acornRef}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-15.5 py-4"
      >
        <BigAcornIcon className="h-24 w-24" />
        <span className="body-4 text-black">{acornCount}</span>
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
        >
          <BoomerangIcon className="h-40 w-40" />
        </button>
      </div>
    </div>
  );
};

export default HeaderButtons;
