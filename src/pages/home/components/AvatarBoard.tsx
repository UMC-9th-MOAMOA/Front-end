import faceDefault from "@/assets/icons/home/character/items/emotion/ic_face_default.svg";
import shadowDefault from "@/assets/icons/home/character/shadow/ic_shadow_default.svg";
import shadowField from "@/assets/icons/home/character/shadow/ic_shadow_field.svg";
import shadowHill from "@/assets/icons/home/character/shadow/ic_shadow_hill.svg";
import shadowOcean from "@/assets/icons/home/character/shadow/ic_shadow_ocean.svg";
import shadowRoom1 from "@/assets/icons/home/character/shadow/ic_shadow_room1.svg";
import shadowRoom2 from "@/assets/icons/home/character/shadow/ic_shadow_room2.svg";
import shadowRoom3 from "@/assets/icons/home/character/shadow/ic_shadow_room3.svg";
import squirrelDefault from "@/assets/icons/home/character/squirrel_default.svg";
import type { EquippedItemInfo } from "@/types/home/home";
import type { ItemType } from "@/types/home/shop";
import { AVATAR_LAYER_ORDER } from "../constants/avatarConfig";

const BACKGROUND_SHADOW_MAP: Record<number, string> = {
  41: shadowRoom1,
  42: shadowRoom2,
  43: shadowRoom3,
  44: shadowField,
  45: shadowHill,
  46: shadowOcean,
};

interface AvatarBoardProps {
  equippedItems: Partial<Record<ItemType, EquippedItemInfo>>;
}

const AvatarBoard = ({ equippedItems }: AvatarBoardProps) => {
  const itemEntries = Object.entries(equippedItems).filter(
    ([type]) => type !== "FACE" && type !== "BACKGROUND"
  ) as [ItemType, EquippedItemInfo][];

  const backgroundId = equippedItems.BACKGROUND?.itemId;
  const shadowSrc = backgroundId
    ? BACKGROUND_SHADOW_MAP[backgroundId]
    : shadowDefault;

  return (
    <div className="relative h-360 w-360">
      {shadowSrc && (
        <img
          src={shadowSrc}
          alt="그림자"
          className="absolute inset-0 h-full w-full"
          style={{ zIndex: 0 }}
        />
      )}

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
