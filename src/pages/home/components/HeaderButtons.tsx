import BigAcornIcon from "@/assets/icons/ic_big_acorn.svg?react";
import PocketIcon from "@/assets/icons/ic_pocket.svg?react";

interface HeaderButtonsProps {
  acornCount: number;
}

const HeaderButtons = ({ acornCount }: HeaderButtonsProps) => {
  return (
    <>
      {/* 왼쪽 상단: 주머니 버튼 */}
      <button
        type="button"
        className="absolute top-42 left-7 z-10 flex flex-col items-center gap-2 rounded-xl bg-white px-22 py-12"
      >
        <PocketIcon className="h-40 w-40" />
        <span className="body-4 text-black">주머니</span>
      </button>

      {/* 오른쪽 상단: 도토리 버튼 */}
      <button
        type="button"
        className="absolute top-42 right-7 z-10 flex items-center gap-2 rounded-xl bg-white px-18 py-3"
      >
        <BigAcornIcon className="h-40 w-29" />
        <span className="body-2 text-black">{acornCount}</span>
      </button>
    </>
  );
};

export default HeaderButtons;
