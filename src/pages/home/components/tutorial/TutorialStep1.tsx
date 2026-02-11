import IcTutorialArrow from "@/assets/icons/home/tutorial/ic_tutorial_arrow.svg?react";
import type { ComponentPositions } from "./TutorialOverlay";
import TutorialSpotlight from "./TutorialSpotlight";

interface TutorialStep1Props {
  positions: ComponentPositions;
}

const TutorialStep1 = ({ positions }: TutorialStep1Props) => {
  const { pocket, toolbar } = positions;

  return (
    <>
      <TutorialSpotlight positions={[pocket, toolbar]} />
      <div className="pointer-events-none relative h-full w-full" style={{ zIndex: 20 }}>
        {pocket && (
        <>
          <div
            className="body3 absolute text-right text-white"
            style={{
              right: `calc(100% - ${pocket.left}px - 20px)`,
              top: pocket.top + pocket.height + 40,
              transform: "translateY(-50%)",
            }}
          >
            <p className="whitespace-nowrap">
              <span className="text-moamoa-200">주머니</span>에서 모은
            </p>
            <p className="whitespace-nowrap">자투리 시간을 확인할 수 있어요</p>
          </div>
          <IcTutorialArrow
            className="absolute"
            style={{
              right: `calc(100% - ${pocket.left}px + 5px)`,
              top: pocket.top + pocket.height,
              transform: "translateY(-50%)",
            }}
          />
        </>
      )}

      {toolbar && (
        <>
          <IcTutorialArrow
            className="absolute"
            style={{
              left: toolbar.left - 27,
              top: toolbar.top + 107,
              transform: "translate(-100%, -100%) translateX(18px)",
            }}
          />
          <div
            className="body3 absolute text-right text-white"
            style={{
              left: toolbar.left - 16,
              top: toolbar.top + 138,
              transform: "translate(-100%, -50%)",
            }}
          >
            <p className="whitespace-nowrap">모아를 꾸며볼까요?</p>
            <p className="whitespace-nowrap">
              옷과 아이템을 골라 입힐 수 있어요
            </p>
          </div>
        </>
      )}
      </div>
    </>
  );
};

export default TutorialStep1;
