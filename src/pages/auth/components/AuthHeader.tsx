import { useNavigate } from "react-router-dom";
import IcClose from "@/assets/icons/auth/ic_close.svg?react";

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function AuthHeader({ title, onBack }: HeaderProps) {
  const navigate = useNavigate();

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
          <IcClose className="size-24" />
        </button>
        <h1 className="heading-2 text-center text-black">{title}</h1>
      </header>
      <div className="-mx-layout-side h-1 w-[calc(100%+50px)] bg-gray-200" />
    </>
  );
}
