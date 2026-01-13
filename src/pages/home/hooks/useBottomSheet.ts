import { useEffect, useState } from "react";
import type { CustomizationType } from "../components/BottomSheet";

export const useBottomSheet = () => {
  const [activeCustomization, setActiveCustomization] =
    useState<CustomizationType | null>(null);
  const [sheetTop, setSheetTop] = useState(533);

  const handleToolbarClick = (type: CustomizationType) => {
    if (activeCustomization === type) {
      if (sheetTop === 412) {
        setSheetTop(533);
      } else {
        setActiveCustomization(null);
      }
    } else {
      setActiveCustomization(type);
      setSheetTop(533);
    }
  };

  const handleOutsideClick = () => {
    if (sheetTop === 412) {
      setSheetTop(533);
    }
  };

  useEffect(() => {
    if (activeCustomization) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCustomization]);

  return {
    activeCustomization,
    sheetTop,
    setSheetTop,
    handleToolbarClick,
    handleOutsideClick,
  };
};
