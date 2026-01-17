import { useNavigate } from "react-router-dom";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcMenu from "@/assets/icons/ic_menu.svg?react";
import IcSearch from "@/assets/icons/ic_search.svg?react";

interface HeaderProps {
  title: string;
  property: "common" | "search" | "menu";
  onBack?: () => void;
  onSearch?: () => void;
  onMenu?: () => void;
}

export default function Header({
  title,
  property,
  onBack,
  onSearch,
  onMenu,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="grid grid-cols-[1.5rem_1fr_1.5rem] items-center pt-7">
      <button type="button" aria-label="뒤로가기" onClick={handleBack}>
        <IcLeft className="size-24" />
      </button>
      <h1 className="heading-2 text-center text-black">{title}</h1>
      <div className="flex justify-end">
        {property === "search" && (
          <button type="button" aria-label="검색" onClick={onSearch}>
            <IcSearch className="size-6" />
          </button>
        )}
        {property === "menu" && (
          <button type="button" aria-label="메뉴" onClick={onMenu}>
            <IcMenu className="size-6" />
          </button>
        )}
      </div>
    </header>
  );
}
