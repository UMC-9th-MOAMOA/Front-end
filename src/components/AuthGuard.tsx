import { type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/auth/useAuth";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_PATHS = [
  "/",
  "/start",
  "/login",
  "/signup",
  "/find-id",
  "/password",
  "/terms",
  "/oauth/callback",
];

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isAuthenticated, policyAgreed } = useAuth();

  const isPublicPath = PUBLIC_PATHS.includes(location.pathname);
  const isTermsPage = location.pathname === "/terms";

  useEffect(() => {
    if (isLoading) return;

    if (!isPublicPath && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (isAuthenticated && policyAgreed !== true && !isTermsPage) {
      navigate("/terms", { replace: true, state: { from: location.pathname } });
      return;
    }

    if (location.pathname === "/login" && isAuthenticated) {
      if (policyAgreed !== true) {
        navigate("/terms", {
          replace: true,
          state: { from: location.pathname },
        });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [
    location.pathname,
    navigate,
    isAuthenticated,
    isLoading,
    isPublicPath,
    isTermsPage,
    policyAgreed,
  ]);

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

  if (isAuthenticated && policyAgreed !== true && !isTermsPage) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
