import { type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/auth/useAuth";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_PATHS = ["/login", "/signup", "/find-id", "/reset-password"];

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAuth();

  const isPublicPath = PUBLIC_PATHS.includes(location.pathname);

  useEffect(() => {
    if (isLoading) return;

    if (!isPublicPath && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (location.pathname === "/login" && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate, isAuthenticated, isLoading, isPublicPath]);

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <LoadingSpinner className="size-60" />
      </div>
    );
  }

  if (!isPublicPath && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
