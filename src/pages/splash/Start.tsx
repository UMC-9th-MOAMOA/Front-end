import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SquirrelStart from "@/assets/icons/squirrel_start.svg?react";
import Logo from "@/assets/LOGO.svg?react";
import { Button } from "@/components/common/button/Button";

interface StartPageProps {
  enableFade?: boolean;
}

const StartPage = ({ enableFade = true }: StartPageProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enableFade) {
      setIsVisible(true);
      return;
    }

    const raf = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [enableFade]);

  return (
    <div
      className={`-mb-96 flex flex-1 flex-col items-center ${enableFade ? "transition-opacity duration-400" : ""} ${isVisible ? "opacity-100" : "opacity-0"} `}
    >
      <Logo className="mx-auto mt-85 block h-auto w-193" aria-label="MOAMOA" />
      <div className="flex flex-col items-center gap-20">
        <h1 className="heading-1 mt-34 text-center text-black">
          <span>반가워요!</span>
          <span className="block">모아모아를 시작해볼까요?</span>
        </h1>
        <p className="body-4 mt-12 text-center text-gray-500">
          함께 숨겨진 시간을 찾아 생산적인 하루를 보내보세요.
        </p>
      </div>
      <SquirrelStart className="mt-40 h-auto w-300 px-7" aria-hidden="true" />
      <Button
        type="button"
        className="mt-auto mb-80 h-48 w-full rounded-lg bg-moamoa-300 py-16 font-semibold text-base text-white"
        onClick={() => navigate("/home")}
      >
        시작하기
      </Button>
    </div>
  );
};

export default StartPage;
