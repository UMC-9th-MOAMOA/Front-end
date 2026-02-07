import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import squirrelDefault from "@/assets/icons/home/character/squirrel_default.svg";
import { useAttendanceStore } from "@/store/attendance/attendance";
import { getWeeklyAttendance } from "@/utils/attendance/attendance";
import CustomizationToolbar from "./components/CustomizationToolbar";
import HeaderButtons from "./components/HeaderButtons";
import AttendanceModal from "./components/modal/AttendanceModal";
import QuestionBox from "./components/QuestionBox";
import BottomSheet from "./components/shop/BottomSheet";
import { CUSTOMIZATION_ITEMS } from "./constants/constants";
import useBgm from "./hooks/useBgm";
import { useBottomSheet } from "./hooks/useBottomSheet";

const HomePage = () => {
  useBgm("/audio/bgm.mp3");
  const navigate = useNavigate();
  const [acornCount] = useState(13);
  const nickname = "사용자";

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

  return (
    <div className="relative flex flex-col">
      <HeaderButtons acornCount={acornCount} />

      <div className="absolute top-152 right-0 z-20">
        <CustomizationToolbar
          items={CUSTOMIZATION_ITEMS}
          activeCustomization={activeCustomization}
          onItemClick={handleToolbarClick}
        />
      </div>

      <div className="mt-134 flex justify-center">
        <img src={squirrelDefault} alt="다람쥐 캐릭터" className="z-10" />
      </div>

      {!activeCustomization && (
        <div className="mt-17 mb-21 flex justify-center">
          <QuestionBox nickname={nickname} onTimeSelect={handleTimeSelect} />
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

export default HomePage;
