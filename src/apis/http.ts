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
async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    return {} as T;
  }
  return JSON.parse(text) as T;
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

  const data = await parseJson<T>(response);

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

  return data;
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
