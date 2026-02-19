interface QuizQuitPopupProps {
  onQuit: () => void;
  onStay: () => void;
}

export default function QuizQuitPopup({ onQuit, onStay }: QuizQuitPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-48 w-full rounded-xl bg-white px-20 pt-28 pb-20">
        <h2 className="heading-3 text-center text-red-400">잠깐 !</h2>
        <p className="body-2 mt-12 text-center text-gray-700">
          지금 나가면 얻은 도토리가 사라져요.
          <br />
          재도전하면 도토리를 얻을 수 없어요.
        </p>
        <div className="flex gap-12 pt-32">
          <button
            type="button"
            onClick={onQuit}
            className="body-2 flex-1 rounded-xl bg-moamoa-50 py-12 text-blue-600"
          >
            다음에 할게요
          </button>
          <button
            type="button"
            onClick={onStay}
            className="body-2 flex-1 rounded-xl bg-moamoa-300 py-12 text-white"
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
}
