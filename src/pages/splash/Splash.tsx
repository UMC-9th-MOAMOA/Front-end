import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/LOGO.svg?react";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/start", { replace: true });
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="-mb-96 flex flex-1 flex-col items-center justify-center px-24">
      <Logo className="h-40 w-full" aria-label="MOAMOA" />
    </div>
  );
};

export default SplashPage;
