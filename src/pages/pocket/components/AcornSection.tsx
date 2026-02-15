import AcornIcon from "@/assets/icons/ic_acorn.svg?react";

interface AcornSectionProps {
  acornCount: number;
}

export default function AcornSection({ acornCount }: AcornSectionProps) {
  return (
    <div className="mt-32 flex items-center justify-between rounded-xl bg-gray-100 px-20 py-7 text-black">
      <AcornIcon className="h-55 w-40" />
      <div className="mr-8 flex items-center gap-29">
        <span className="heading-5">내 도토리</span>
        <div className="flex items-baseline gap-8">
          <span className="heading-1">{acornCount}</span>
          <span className="heading-5">개</span>
        </div>
      </div>
    </div>
  );
}
