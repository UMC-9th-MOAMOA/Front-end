import { type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "@/apis/storage";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_PATHS = ["/login", "/signup", "/find-id", "/reset-password"];

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicPath = PUBLIC_PATHS.includes(location.pathname);
  const accessToken = storage.getToken();

  useEffect(() => {
    if (!isPublicPath && !accessToken) {
      navigate("/login", { replace: true });
      return;
    }

    if (location.pathname === "/login" && accessToken) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate, isPublicPath, accessToken]);

  if (!isPublicPath && !accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
