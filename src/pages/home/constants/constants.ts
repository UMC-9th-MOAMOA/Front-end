import BgForest from "@/assets/icons/home/items/backgrounds/ic_bg_forest.svg";
import BgHill from "@/assets/icons/home/items/backgrounds/ic_bg_hill.svg";
import BgOcean from "@/assets/icons/home/items/backgrounds/ic_bg_ocean.svg";
import BgRoom1 from "@/assets/icons/home/items/backgrounds/ic_bg_room1.svg";
import BgRoom2 from "@/assets/icons/home/items/backgrounds/ic_bg_room2.svg";
import BgStudy from "@/assets/icons/home/items/backgrounds/ic_bg_study.svg";
import DownCargoPants from "@/assets/icons/home/items/downs/ic_down_cargo_pants.svg?react";
import DownJeans from "@/assets/icons/home/items/downs/ic_down_jeans.svg?react";
import DownKnit from "@/assets/icons/home/items/downs/ic_down_knit.svg?react";
import DownShorts from "@/assets/icons/home/items/downs/ic_down_shorts.svg?react";
import DownSkirt from "@/assets/icons/home/items/downs/ic_down_skirt.svg?react";
import DownSlacks from "@/assets/icons/home/items/downs/ic_down_slacks.svg?react";
import EmotionDdol from "@/assets/icons/home/items/emotions/ic_emotion_ddol.svg?react";
import EmotionDrowsy from "@/assets/icons/home/items/emotions/ic_emotion_drowsy.svg?react";
import EmotionNice from "@/assets/icons/home/items/emotions/ic_emotion_nice.svg?react";
import EmotionShameful from "@/assets/icons/home/items/emotions/ic_emotion_shameful.svg?react";
import EmotionSleepy from "@/assets/icons/home/items/emotions/ic_emotion_sleepy.svg?react";
import EmotionStraight from "@/assets/icons/home/items/emotions/ic_emotion_straight.svg?react";
import GoodsEarmuffs from "@/assets/icons/home/items/goods/ic_goods_earmuffs.svg?react";
import GoodsGlasses from "@/assets/icons/home/items/goods/ic_goods_glasses.svg?react";
import GoodsGloves from "@/assets/icons/home/items/goods/ic_goods_gloves.svg?react";
import GoodsHat from "@/assets/icons/home/items/goods/ic_goods_hat.svg?react";
import GoodsMuffler from "@/assets/icons/home/items/goods/ic_goods_muffler.svg?react";
import GoodsShoes from "@/assets/icons/home/items/goods/ic_goods_shoes.svg?react";
import UpJacket from "@/assets/icons/home/items/ups/ic_up_jacket.svg?react";
import UpKnit from "@/assets/icons/home/items/ups/ic_up_knit.svg?react";
import UpRaincoat from "@/assets/icons/home/items/ups/ic_up_raincoat.svg?react";
import UpShirt from "@/assets/icons/home/items/ups/ic_up_shirt.svg?react";
import UpShort from "@/assets/icons/home/items/ups/ic_up_short.svg?react";
import UpVest from "@/assets/icons/home/items/ups/ic_up_vest.svg?react";
import BackgroundIcon from "@/assets/icons/ic_background.svg?react";
import BottomIcon from "@/assets/icons/ic_bottom.svg?react";
import ExpressionIcon from "@/assets/icons/ic_expression.svg?react";
import HaberdasheryIcon from "@/assets/icons/ic_haberdashery.svg?react";
import TopIcon from "@/assets/icons/ic_top.svg?react";

import type { CustomizationType, ShopItem, ToolbarItem } from "../types/types";

export const CUSTOMIZATION_ITEMS: ToolbarItem[] = [
  { type: "background", icon: BackgroundIcon, label: "배경" },
  { type: "expression", icon: ExpressionIcon, label: "표정" },
  { type: "top", icon: TopIcon, label: "상의" },
  { type: "bottom", icon: BottomIcon, label: "하의" },
  { type: "haberdashery", icon: HaberdasheryIcon, label: "잡화" },
];
export const SHOP_ITEMS: Record<CustomizationType, ShopItem[]> = {
  background: [
    { id: "bg_room1", name: "방1", price: 700, image: BgRoom1 },
    { id: "bg_room2", name: "방2", price: 750, image: BgRoom2 },
    { id: "bg_study", name: "서재", price: 800, image: BgStudy },
    { id: "bg_hill", name: "언덕", price: 850, image: BgHill },
    { id: "bg_forest", name: "숲", price: 900, image: BgForest },
    { id: "bg_ocean", name: "바다", price: 1000, image: BgOcean },
  ],
  expression: [
    { id: "emotion_nice", name: "좋아", price: 60, icon: EmotionNice },
    { id: "emotion_ddol", name: "똘", price: 60, icon: EmotionDdol },
    { id: "emotion_sleepy", name: "졸려", price: 50, icon: EmotionSleepy },
    { id: "emotion_drowsy", name: "나른", price: 40, icon: EmotionDrowsy },
    { id: "emotion_shameful", name: "부끄", price: 50, icon: EmotionShameful },
    {
      id: "emotion_straight",
      name: "무표정",
      price: 40,
      icon: EmotionStraight,
    },
  ],
  top: [
    { id: "up_shirt", name: "셔츠", price: 530, icon: UpShirt },
    { id: "up_knit", name: "니트", price: 550, icon: UpKnit },
    { id: "up_raincoat", name: "우비", price: 450, icon: UpRaincoat },
    { id: "up_vest", name: "조끼", price: 480, icon: UpVest },
    { id: "up_jacket", name: "자켓", price: 600, icon: UpJacket },
    { id: "up_short", name: "반팔", price: 470, icon: UpShort },
  ],
  bottom: [
    { id: "down_jeans", name: "청바지", price: 450, icon: DownJeans },
    { id: "down_skirt", name: "치마", price: 390, icon: DownSkirt },
    { id: "down_slacks", name: "슬랙스", price: 430, icon: DownSlacks },
    { id: "down_shorts", name: "반바지", price: 370, icon: DownShorts },
    { id: "down_knit", name: "니트", price: 410, icon: DownKnit },
    { id: "down_cargo_pants", name: "카고", price: 430, icon: DownCargoPants },
  ],
  haberdashery: [
    { id: "goods_hat", name: "모자", price: 180, icon: GoodsHat },
    { id: "goods_glasses", name: "안경", price: 200, icon: GoodsGlasses },
    { id: "goods_gloves", name: "장갑", price: 160, icon: GoodsGloves },
    { id: "goods_shoes", name: "신발", price: 200, icon: GoodsShoes },
    { id: "goods_earmuffs", name: "귀마개", price: 150, icon: GoodsEarmuffs },
    { id: "goods_muffler", name: "목도리", price: 170, icon: GoodsMuffler },
  ],
};
