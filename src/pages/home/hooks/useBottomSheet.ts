import { useEffect, useState } from "react";
import type { CustomizationType } from "../types";

export const useBottomSheet = () => {
  const [activeCustomization, setActiveCustomization] =
    useState<CustomizationType | null>(null);
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

  const handleToolbarClick = (type: CustomizationType) => {
    if (activeCustomization === type) {
      if (isExpanded) {
        setIsExpanded(false);
      } else {
        close();
      }
    } else {
      setActiveCustomization(type);
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
