import { type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "@/apis/storage";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const publicPaths = ["/login", "/signup", "/find-id", "/reset-password"];
  const isPublicPath = publicPaths.includes(location.pathname);

  useEffect(() => {
    const accessToken = storage.getToken();

    if (!isPublicPath && !accessToken) {
      navigate("/login", { replace: true });
    }

    if (location.pathname === "/login" && accessToken) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate, isPublicPath]);

  return <>{children}</>;
};

export default AuthGuard;
