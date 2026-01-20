type Props = {
  onPageClick?: (page: number) => void;
  pages?: number[];
};

export default function MissionPagination({ onPageClick, pages }: Props) {
  const pageList = pages ?? [1, 2, 3, 4, 5];

  return (
    <div className="absolute top-[calc(28px+1226px)] left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-[8px]">
        {pageList.map((n) => (
          <button
            key={n}
            type="button"
            className="h-[21px] w-[10px] text-center text-[#667085] text-[14px] leading-[21px]"
            onClick={() => onPageClick?.(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
