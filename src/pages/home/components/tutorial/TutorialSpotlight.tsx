interface SpotlightProps {
  positions: Array<DOMRect | undefined>;
}

const TutorialSpotlight = ({ positions }: SpotlightProps) => {
  const validPositions = positions.filter(
    (pos): pos is DOMRect => pos !== undefined
  );

  if (validPositions.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    >
      <defs>
        <mask id="spotlight-mask">
          {/* 전체를 흰색(불투명)으로 */}
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          {/* 강조할 영역만 검은색(투명)으로 - 컴포넌트 크기 그대로 */}
          {validPositions.map((pos, index) => (
            <rect
              key={index}
              x={pos.left}
              y={pos.top}
              width={pos.width}
              height={pos.height}
              rx="8"
              fill="black"
            />
          ))}
        </mask>
      </defs>
      {/* 반투명 배경에 마스크 적용 */}
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="#242C3DCC"
        mask="url(#spotlight-mask)"
      />
    </svg>
  );
};

export default TutorialSpotlight;
