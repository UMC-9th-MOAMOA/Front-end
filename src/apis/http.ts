// 에러 통일 규격
export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};

// JSON 요청 헤더를 기본으로 설정
const DEFAULT_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
};

// 응답을 JSON으로 파싱하는 헬퍼 함수
async function parseBody<T>(response: Response): Promise<T | string | null> {
  // 1. 본문이 없는 상태 코드 처리
  if (response.status === 204 || response.status === 205) return null;

  try {
    const text = await response.text();
    if (!text) return null;

    const contentType = response.headers.get("content-type") ?? "";

    // 2. JSON 파싱 시도
    if (contentType.includes("application/json")) {
      try {
        return JSON.parse(text) as T;
      } catch {
        return text;
      }
    }

    // 3. 그 외
    return text;
  } catch (error) {
    console.error("Parsing error:", error);
    return null;
  }
}

// fetch 실행, 헤더 합치기, 에러 처리
async function request<T>(input: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...DEFAULT_HEADERS,
      ...(init.headers ?? {}),
    },
    credentials: "include",
  });

  const data = await parseBody<T>(response);

  if (!response.ok) {
    const error: ApiError = {
      message: "요청에 실패했습니다.",
      status: response.status,
    };

    if (typeof data === "object" && data !== null) {
      const maybeMessage = (data as { message?: string }).message;
      const maybeCode = (data as { code?: string }).code;
      if (maybeMessage) error.message = maybeMessage;
      if (maybeCode) error.code = maybeCode;
    }

    throw error;
  }

  return data as T;
}

// 인증이 필요 없는 요청
export function publicFetch<T>(input: string, init: RequestInit = {}) {
  return request<T>(input, init);
}

// 저장된 인증 정보 가져오기
function getStoredAuth() {
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";
  const grantType =
    localStorage.getItem("grantType") ||
    sessionStorage.getItem("grantType") ||
    "Bearer";

  return { accessToken, grantType };
}

// 인증이 필요한 요청
export function authFetch<T>(input: string, init: RequestInit = {}) {
  const { accessToken, grantType } = getStoredAuth();
  const authHeader = accessToken ? `${grantType} ${accessToken}` : "";

  return request<T>(input, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
  });
}
