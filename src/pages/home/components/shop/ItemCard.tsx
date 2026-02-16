import LockIcon from "@/assets/icons/home/ic_lock.svg?react";
import AcornIcon from "@/assets/icons/ic_acorn.svg?react";
import CheckCircleIcon from "@/assets/icons/ic_check_active.svg?react";
import type { ShopItem } from "@/types/home/shop";
import { cn } from "@/utils/cn/cn";
import type { ItemStatus } from "../../types/types";

interface ItemCardProps {
  item: ShopItem;
  isBackground: boolean;
  status: ItemStatus;
  onSelect?: () => void;
}

const ItemCard = ({ item, isBackground, status, onSelect }: ItemCardProps) => {
  const isSelected = status === "selected";
  const isLocked = status === "locked";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative h-102 w-87 overflow-hidden rounded-lg border border-moamoa-300",
        isSelected ? "border-3" : "border"
      )}
    >
      <div
        className={cn(
          "flex h-full w-full items-center justify-center",
          !isBackground && "bg-white"
        )}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className={cn(
            isBackground
              ? "h-full w-full object-cover"
              : "h-60 w-60 object-contain"
          )}
        />
      </div>

      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#5E5E5EB2]">
          <LockIcon className="h-46 w-46" />
        </div>
      )}

      {isSelected && (
        <div className="absolute inset-0 bg-[#114CCF1A]">
          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <CheckCircleIcon className="h-24 w-24" />
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 z-5 flex -translate-x-1/2 items-center gap-1 rounded-sm px-4 py-2">
        <AcornIcon className="h-24 w-24" />
        <span className="body-5 text-black">{item.price}</span>
      </div>
    </button>
  );
};

export default ItemCard;
