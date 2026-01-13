import { useState } from "react";

import squirrelDefault from "@/assets/images/squirrel_default.png";
import BottomSheet from "./components/BottomSheet";
import CustomizationToolbar from "./components/CustomizationToolbar";
import HeaderButtons from "./components/HeaderButtons";
import QuestionBox from "./components/QuestionBox";
import { CUSTOMIZATION_ITEMS } from "./constants/constants";
import { useBottomSheet } from "./hooks/useBottomSheet";

const HomePage = () => {
  const [acornCount] = useState(13); // 서버에서 받아올 예정
  const [, setSelectedTime] = useState<number | null>(null);
  const nickname = "사용자"; // 서버에서 받아올 예정

  const {
    activeCustomization,
    sheetTop,
    setSheetTop,
    handleToolbarClick,
    handleOutsideClick,
  } = useBottomSheet();

  return (
    <div className="relative min-h-674">
      <HeaderButtons acornCount={acornCount} />

      <CustomizationToolbar
        items={CUSTOMIZATION_ITEMS}
        activeCustomization={activeCustomization}
        onItemClick={handleToolbarClick}
      />

      <img
        src={squirrelDefault}
        alt="다람쥐 캐릭터"
        className="absolute top-221 left-28 z-5"
      />

      {!activeCustomization && (
        <QuestionBox nickname={nickname} onTimeSelect={setSelectedTime} />
      )}

      {activeCustomization && sheetTop === 412 && (
        <div className="fixed inset-0 z-14" onClick={handleOutsideClick} />
      )}

      {activeCustomization && (
        <BottomSheet
          type={activeCustomization}
          items={CUSTOMIZATION_ITEMS}
          sheetTop={sheetTop}
          setSheetTop={setSheetTop}
        />
      )}
    </div>
  );
};

export default HomePage;
