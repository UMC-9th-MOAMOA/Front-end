import { useNavigate } from "react-router-dom";
import IcLeft from "@/assets/icons/ic_left.svg?react";

interface MissionHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function MissionHeader({ title, onBack }: MissionHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="mx-auto flex h-33 w-321 items-center gap-78 pt-30">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={handleBack}
        className="flex h-24 w-24 shrink-0 items-center justify-center"
      >
        <IcLeft className="text-black" />
      </button>

      <h1 className="heading-2 w-117 text-center text-black">{title}</h1>
    </header>
  );
}
