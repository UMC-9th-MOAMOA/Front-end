import { useNavigate } from "react-router-dom";
import IcCart from "@/assets/icons/ic_cart.svg?react";
import IcHeart from "@/assets/icons/ic_heart.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcMenu from "@/assets/icons/ic_menu.svg?react";
import IcQuit from "@/assets/icons/ic_quit.svg?react";
import IcSearch from "@/assets/icons/ic_search.svg?react";
import { cn } from "@/utils/cn/cn";

interface HeaderProps {
  title: string;
  property: "common" | "search" | "menu" | "cart" | "heart";
  leftIcon?: "left" | "quit";
  className?: string;
  onBack?: () => void;
  onRightIconClick?: () => void;
}

export default function Header({
  title,
  property,
  leftIcon = "left",
  className,
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

  const LeftIcon = leftIcon === "quit" ? IcQuit : IcLeft;

  return (
    <header
      className={cn(
        "mt-28 grid w-full grid-cols-[24px_1fr_24px] items-center",
        className
      )}
    >
      <LeftIcon className="size-24 cursor-pointer" onClick={handleBack} />
      <h1 className="heading-2 min-w-0 truncate text-center text-black">
        {title}
      </h1>
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
