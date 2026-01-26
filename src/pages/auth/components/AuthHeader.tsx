import { useNavigate } from "react-router-dom";
import IcBackChevron from "@/assets/icons/ic_back_chevron.svg?react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import IcLeft from "@/assets/icons/ic_left.svg?react";

type HeaderIconType = "close" | "chevron" | "arrow";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  iconType?: HeaderIconType;
}

const ICON_MAP: Record<
  HeaderIconType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  close: IcClose,
  chevron: IcBackChevron,
  arrow: IcLeft,
};

export default function AuthHeader({
  title,
  onBack,
  iconType = "close",
}: HeaderProps) {
  const navigate = useNavigate();
  const Icon = ICON_MAP[iconType];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <header className="grid grid-cols-[1.5rem_1fr_1.5rem] items-center pt-24 pb-14">
        <button type="button" aria-label="뒤로가기" onClick={handleBack}>
          <Icon className="size-24" />
        </button>
        <h1 className="heading-2 text-center text-black">{title}</h1>
      </header>
      <div className="-mx-25 mt-16 h-1 w-[calc(100%+50px)] bg-gray-200" />
    </>
  );
}
