import { useNavigate } from "react-router-dom";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcBackChevron from "@/assets/icons/ic_back_chevron.svg?react";
import IcClose from "@/assets/icons/ic_close.svg?react";

type HeaderIconType = "close" | "chevron" | "arrow";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  iconType?: HeaderIconType;
  showBack?: boolean;
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
  showBack = true,
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
    <header className="sticky top-0 z-50 -mx-layout-side bg-white px-layout-side">
      <div className="grid grid-cols-[1.5rem_1fr_1.5rem] items-center pt-24 pb-14">
        {showBack ? (
          <button type="button" aria-label="뒤로가기" onClick={handleBack}>
            <Icon
              className={iconType === "arrow" ? "size-24 text-gray-600" : "size-24"}
            />
          </button>
        ) : (
          <div aria-hidden="true" />
        )}
        <h1 className="heading-2 text-center text-gray-800">{title}</h1>
      </div>
      <div className="-mx-layout-side h-1 w-[calc(100%+50px)] bg-gray-200" />
    </header>
  );
}
