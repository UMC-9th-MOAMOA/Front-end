import faceDefault from "@/assets/icons/home/character/ic_face_default.svg";
import squirrelDefault from "@/assets/icons/home/character/squirrel_default.svg";
import type { EquippedItemInfo } from "@/types/home/home";
import type { ItemType } from "@/types/home/shop";
import { AVATAR_LAYER_ORDER } from "../constants/avatarConfig";

interface AvatarBoardProps {
  equippedItems: Partial<Record<ItemType, EquippedItemInfo>>;
}

const AvatarBoard = ({ equippedItems }: AvatarBoardProps) => {
  const itemEntries = Object.entries(equippedItems).filter(
    ([type]) => type !== "FACE" && type !== "BACKGROUND"
  ) as [ItemType, EquippedItemInfo][];

  return (
    <div className="relative h-360 w-360">
      <img
        src={squirrelDefault}
        alt="다람쥐 캐릭터"
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 1 }}
      />

      <img
        src={equippedItems.FACE?.imageUrl ?? faceDefault}
        alt={equippedItems.FACE?.name ?? "기본 표정"}
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: AVATAR_LAYER_ORDER.FACE }}
      />

      {itemEntries.map(([type, item]) => (
        <img
          key={type}
          src={item.imageUrl}
          alt={item.name}
          className="absolute inset-0 h-full w-full"
          style={{ zIndex: AVATAR_LAYER_ORDER[type] }}
        />
      ))}
    </div>
  );
};

export default AvatarBoard;
