import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMIZATION_ITEMS } from "../constants/constants";
import { useBottomSheet } from "../hooks/useBottomSheet";
import { useHome } from "../hooks/useQuery/useHome";
import AvatarBoard from "./AvatarBoard";
import CustomizationToolbar from "./CustomizationToolbar";
import HeaderButtons from "./HeaderButtons";
import HomeModals from "./HomeModals";
import QuestionBox from "./QuestionBox";
import BottomSheet from "./shop/BottomSheet";
import TutorialOverlay from "./tutorial/TutorialOverlay";

interface HomeContentProps {
  bgmEnabled: boolean;
  onBgmToggle: (enabled: boolean) => void;
}

const HomeContent = ({ bgmEnabled, onBgmToggle }: HomeContentProps) => {
  const navigate = useNavigate();
  const { data: homeData } = useHome();
  const [showTutorial, setShowTutorial] = useState(homeData.shouldShowTutorial);

  const acornRef = useRef<HTMLDivElement>(null);
  const pocketRef = useRef<HTMLButtonElement>(null);
  const boomerangRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const questionBoxRef = useRef<HTMLDivElement>(null);

  const handleTimeSelect = (time: number) => {
    navigate(`/today-mission?time=${time}`);
  };

  const {
    activeCustomization,
    isExpanded,
    setIsExpanded,
    handleToolbarClick,
    handleOutsideClick,
  } = useBottomSheet();

  const backgroundUrl = homeData.equippedItems.BACKGROUND?.imageUrl;

  return (
    <div
      className="relative -mx-layout-side -mb-96 flex min-h-screen flex-col bg-center bg-cover px-layout-side pb-96"
      style={
        backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : undefined
      }
    >
      <HeaderButtons
        acornCount={homeData.point}
        acornRef={acornRef}
        pocketRef={pocketRef}
        boomerangRef={boomerangRef}
        bgmEnabled={bgmEnabled}
        onBgmToggle={onBgmToggle}
      />

      <div ref={toolbarRef} className="absolute top-152 right-layout-side z-20">
        <CustomizationToolbar
          items={CUSTOMIZATION_ITEMS}
          activeCustomization={activeCustomization}
          onItemClick={handleToolbarClick}
        />
      </div>

      <div className="mt-88 flex justify-center">
        <AvatarBoard equippedItems={homeData.equippedItems} />
      </div>

      {!activeCustomization && (
        <div className="mb-20 flex justify-center">
          <QuestionBox
            ref={questionBoxRef}
            nickname={homeData.memberName}
            onTimeSelect={handleTimeSelect}
          />
        </div>
      )}

      <AnimatePresence>
        {activeCustomization && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick}
          />
        )}
        {activeCustomization && (
          <BottomSheet
            key="bottom-sheet"
            category={activeCustomization}
            items={CUSTOMIZATION_ITEMS}
            isExpanded={isExpanded}
            onExpandChange={setIsExpanded}
          />
        )}
      </AnimatePresence>

      <HomeModals />

      {showTutorial && (
        <TutorialOverlay
          onClose={() => setShowTutorial(false)}
          acornRef={acornRef}
          pocketRef={pocketRef}
          boomerangRef={boomerangRef}
          toolbarRef={toolbarRef}
          questionBoxRef={questionBoxRef}
        />
      )}
    </div>
  );
};

export default HomeContent;
