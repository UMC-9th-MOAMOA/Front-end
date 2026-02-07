import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAttendanceStore } from "@/store/attendance/attendance";
import { getWeeklyAttendance } from "@/utils/attendance/attendance";
import { CUSTOMIZATION_ITEMS } from "../constants/constants";
import { useBottomSheet } from "../hooks/useBottomSheet";
import { useHome } from "../hooks/useQuery/useHome";
import AvatarBoard from "./AvatarBoard";
import CustomizationToolbar from "./CustomizationToolbar";
import HeaderButtons from "./HeaderButtons";
import AttendanceModal from "./modal/AttendanceModal";
import QuestionBox from "./QuestionBox";
import BottomSheet from "./shop/BottomSheet";

const HomeContent = () => {
  const navigate = useNavigate();
  const { data: homeData } = useHome();

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

  const { showModal, setShowModal, attendanceData } = useAttendanceStore();

  const backgroundUrl = homeData.equippedItems.BACKGROUND?.imageUrl;

  return (
    <div
      className="relative -mx-layout-side -mb-96 flex min-h-screen flex-col bg-center bg-cover px-layout-side pb-96"
      style={
        backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : undefined
      }
    >
      <HeaderButtons acornCount={homeData.point} />

      <div className="absolute top-152 right-layout-side z-20">
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

      {attendanceData && (
        <AttendanceModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onGoToCalendar={() => {
            setShowModal(false);
            // TODO: 캘린더 페이지로 이동
          }}
          count={attendanceData.streak}
          attendance={getWeeklyAttendance(attendanceData.streak)}
        />
      )}
    </div>
  );
};

export default HomeContent;
