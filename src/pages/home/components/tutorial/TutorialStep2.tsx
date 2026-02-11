import IcTutorialAcornArrow from "@/assets/icons/home/tutorial/ic_tutorial_acron_arrow.svg?react";
import IcTutorialQuestionArrow from "@/assets/icons/home/tutorial/ic_tutorial_question_arrow.svg?react";
import type { ComponentPositions } from "./TutorialOverlay";
import TutorialSpotlight from "./TutorialSpotlight";

interface TutorialStep2Props {
  positions: ComponentPositions;
}

const TutorialStep2 = ({ positions }: TutorialStep2Props) => {
  const { acorn, boomerang, questionBox } = positions;

  return (
    <>
      <TutorialSpotlight positions={[acorn, boomerang, questionBox]} />
      <div className="pointer-events-none relative h-full w-full" style={{ zIndex: 20 }}>
        {acorn && (
        <>
          <IcTutorialAcornArrow
            className="absolute"
            style={{
              left: acorn.right + 2,
              top: acorn.top + acorn.height / 2,
              transform: "translateY(-50%)",
            }}
          />
          <div
            className="body3 absolute text-left text-white"
            style={{
              left: acorn.right + 2,
              top: acorn.top + acorn.height + 20,
              transform: "translateY(-50%)",
            }}
          >
            <p className="whitespace-nowrap">지금까지 모은</p>
            <p className="whitespace-nowrap">
              <span className="text-moamoa-200">도토리</span>를 볼 수 있어요
            </p>
          </div>
        </>
      )}

      {boomerang && (
        <>
          <div
            className="body3 absolute text-right text-white"
            style={{
              right: `calc(100% - ${boomerang.right}px + 19px)`,
              top: boomerang.bottom + 40,
            }}
          >
            <p className="whitespace-nowrap">퀴즈를 다시 풀 수 있어요!</p>
            <p className="whitespace-nowrap">
              <span className="text-moamoa-200">부메랑</span> 버튼을 눌러
              이동해보세요.
            </p>
          </div>
          <IcTutorialQuestionArrow
            className="absolute"
            style={{
              left: boomerang.left,
              top: boomerang.bottom + 4,
            }}
          />
        </>
      )}

      {questionBox && (
        <>
          <IcTutorialQuestionArrow
            className="absolute"
            style={{
              left: questionBox.left + 20,
              top: questionBox.top - 40,
            }}
          />
          <div
            className="body3 absolute text-left text-white"
            style={{
              left: questionBox.left + 56,
              top: questionBox.top - 64,
            }}
          >
            <p className="whitespace-nowrap">지금 가능한 미션을 알려줄게요</p>
            <p className="whitespace-nowrap">딱 맞는 미션을 찾아줄게요!</p>
          </div>
        </>
      )}
      </div>
    </>
  );
};

export default TutorialStep2;