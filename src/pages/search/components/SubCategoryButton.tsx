interface SubCategoryButtonProps {
  category: {
    categoryId: number;
    name: string;
  };
  isSelected: boolean;
  onClick: (name: string) => void;
}

export default function SubCategoryButton({
  category,
  isSelected,
  onClick,
}: SubCategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(category.name)}
      className={`w-92 shrink-0 rounded-sm py-8 ${
        isSelected ? "bg-moamoa-300 text-white" : "bg-moamoa-50 text-moamoa-300"
      }`}
    >
      <span className="body-4">{category.name}</span>
    </button>
  );
}
