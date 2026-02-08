import { useEffect, useState } from "react";
import type { ItemCategory } from "@/types/home/shop";

export const useBottomSheet = () => {
  const [activeCustomization, setActiveCustomization] =
    useState<ItemCategory | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activeCustomization ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCustomization]);

  const close = () => {
    setActiveCustomization(null);
    setIsExpanded(false);
  };

  const handleToolbarClick = (category: ItemCategory) => {
    if (activeCustomization === category) {
      if (isExpanded) {
        setIsExpanded(false);
      } else {
        close();
      }
    } else {
      setActiveCustomization(category);
      setIsExpanded(false);
    }
  };

  const handleOutsideClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      close();
    }
  };

  return {
    activeCustomization,
    isExpanded,
    setIsExpanded,
    handleToolbarClick,
    handleOutsideClick,
  };
};
