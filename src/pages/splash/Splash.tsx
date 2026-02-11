import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/LOGO.svg?react";
import { useAuth } from "@/hooks/auth/useAuth";

const SplashPage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    let exitTimer = 0;
    let timer = 0;
    const targetPath = isAuthenticated ? "/home" : "/start";

    const raf = window.requestAnimationFrame(() => {
      exitTimer = window.setTimeout(() => {
        setIsExiting(true);
      }, 600);

      timer = window.setTimeout(() => {
        navigate(targetPath, { replace: true });
      }, 1000);
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
      window.clearTimeout(timer);
    };
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="-mb-96 flex flex-1 flex-col items-center justify-center px-24">
      <Logo
        className={`h-40 w-full transition-all duration-400 ${isExiting ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"}`}
        aria-label="MOAMOA"
      />
    </div>
  );
};

export default SplashPage;
