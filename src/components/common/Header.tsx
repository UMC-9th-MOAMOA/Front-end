import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcMenu from "@/assets/icons/ic_menu.svg?react";
import IcSearch from "@/assets/icons/ic_search.svg?react";

interface HeaderProps {
  title: string;
  property: "common" | "search" | "menu";
}

export default function Header({ title, property }: HeaderProps) {
  return (
    <header className="grid grid-cols-[1.5rem_1fr_1.5rem] items-center pt-7">
      <button type="button" aria-label="뒤로가기">
        <IcLeft className="size-6" />
      </button>
      <h1 className="heading-2 text-center text-black">{title}</h1>
      {property === "search" && (
        <button type="button" aria-label="검색">
          <IcSearch className="size-6" />
        </button>
      )}
      {property === "menu" && (
        <button type="button" aria-label="메뉴">
          <IcMenu className="size-6" />
        </button>
      )}
    </header>
  );
}
