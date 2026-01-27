import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoredAuth } from "@/apis/authStorage";
import { refreshTokens } from "@/apis/refresh";

type AuthContextValue = {
  isAuthenticated: boolean;
  isRestoring: boolean;
  syncAuth: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isRestoring: true,
  syncAuth: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRestoring, setIsRestoring] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getStoredAuth().accessToken
  );
  const syncAuth = useCallback(() => {
    setIsAuthenticated(!!getStoredAuth().accessToken);
  }, []);

  // 앱 시작 시 저장된 인증 정보 복원 시도
  useEffect(() => {
    let cancelled = false;

    const restoreAuth = async () => {
      const { accessToken } = getStoredAuth();

      if (!accessToken) {
        try {
          await refreshTokens();
        } catch {
          // TODO: 복원 실패 처리 (가드/페이지에서 리다이렉트 등)
        }
      }

      if (cancelled) return;

      syncAuth();
      setIsRestoring(false);
    };

    void restoreAuth();

    return () => {
      cancelled = true;
    };
  }, [syncAuth]);

  // 로그인 페이지에서 이미 인증된 상태일 경우 홈으로 이동
  useEffect(() => {
    if (location.pathname !== "/login") return;
    if (!isAuthenticated) return;
    navigate("/", { replace: true });
  }, [isAuthenticated, location.pathname, navigate]);

  const value = useMemo(
    () => ({ isAuthenticated, isRestoring, syncAuth }),
    [isAuthenticated, isRestoring, syncAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
