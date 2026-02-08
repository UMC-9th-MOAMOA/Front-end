interface QuizSubmitButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function QuizSubmitButton({
  text,
  disabled = false,
  onClick,
}: QuizSubmitButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`body-2-1 h-48 w-full rounded-xl transition-colors ${
        disabled
          ? "bg-gray-300 text-gray-500"
          : "bg-moamoa-300 text-white active:bg-moamoa-500"
      }`}
    >
      {text}
    </button>
  );
}
