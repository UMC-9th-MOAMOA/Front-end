import { useNavigate } from "react-router-dom";
import IcCart from "@/assets/icons/ic_cart.svg?react";
import IcHeart from "@/assets/icons/ic_heart.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcMenu from "@/assets/icons/ic_menu.svg?react";
import IcSearch from "@/assets/icons/ic_search.svg?react";

interface HeaderProps {
  title: string;
  property: "common" | "search" | "menu" | "cart" | "heart";
  onBack?: () => void;
  onRightIconClick?: () => void;
}

export default function Header({
  title,
  property,
  onBack,
  onRightIconClick,
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
    <header className="grid grid-cols-[1.5rem_1fr_1.5rem] items-center pt-28">
      <IcLeft className="size-24 cursor-pointer" onClick={handleBack} />
      <h1 className="heading-2 text-center text-black">{title}</h1>
      <div className="flex justify-end">
        {property === "search" && (
          <IcSearch
            className="size-24 cursor-pointer"
            onClick={onRightIconClick}
          />
        )}
        {property === "menu" && (
          <IcMenu
            className="size-24 cursor-pointer"
            onClick={onRightIconClick}
          />
        )}
        {property === "cart" && (
          <IcCart
            className="size-24 cursor-pointer"
            onClick={onRightIconClick}
          />
        )}
        {property === "heart" && (
          <IcHeart
            className="size-24 cursor-pointer"
            onClick={onRightIconClick}
          />
        )}
      </div>
    </header>
  );
}
