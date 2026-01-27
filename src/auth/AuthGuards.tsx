import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type GuardProps = PropsWithChildren<{
  redirectTo: string;
}>;

function RestoringFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-gray-500 text-sm">
      인증 확인 중...
    </div>
  );
}

// 인증이 필요한 페이지 접근 시 사용하는 가드
export function RequireAuth({ children, redirectTo }: GuardProps) {
  const { isAuthenticated, isRestoring } = useAuth();
  const location = useLocation();

  if (isRestoring) return <RestoringFallback />;
  if (!isAuthenticated) {
    return (
      <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
}

// 비인증 사용자만 접근 가능한 페이지에 사용하는 가드
export function RequireGuest({ children, redirectTo }: GuardProps) {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) return <RestoringFallback />;
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
}
