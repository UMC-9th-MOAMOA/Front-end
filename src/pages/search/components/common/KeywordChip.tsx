interface KeywordChipProps {
  keyword: string;
  isSelected?: boolean;
  onClick?: () => void;
  size?: "sm" | "lg";
}

export default function KeywordChip({
  keyword,
  isSelected = false,
  onClick,
  size = "sm",
}: KeywordChipProps) {
  const sizeStyles = size === "lg" ? "py-10" : "py-5";
  const colorStyles = isSelected
    ? "border-moamoa-400 bg-moamoa-50 text-moamoa-500"
    : "border-gray-400 bg-white text-black";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`body-4 shrink-0 rounded-full border px-16 ${sizeStyles} ${colorStyles}`}
    >
      # {keyword}
    </button>
  );
}
