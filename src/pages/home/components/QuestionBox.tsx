interface QuestionBoxProps {
  nickname: string;
  onTimeSelect: (time: number) => void;
}

const QuestionBox = ({ nickname, onTimeSelect }: QuestionBoxProps) => {
  return (
    <div className="absolute top-511 w-full">
      <div className="rounded-lg bg-white px-38 py-23">
        <div className="flex flex-col items-center">
          <span className="body-2 text-black">안녕하세요, {nickname}님 !</span>
          <span className="body-2 text-black">
            지금 딱 집중 가능한 시간을 알려주세요!
          </span>
        </div>

        <div className="mt-20 flex justify-center gap-24">
          {[5, 10, 30].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onTimeSelect(time)}
              className="body-4 rounded-md bg-moamoa-50 px-17 py-8 text-moamoa-500"
            >
              {time}분
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
