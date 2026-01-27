const ACCESS_TOKEN_KEY = "accessToken";
const GRANT_TYPE_KEY = "grantType";

export type StoredAuth = {
  accessToken: string;
  grantType: string;
};

export function getStoredAuth(): StoredAuth {
  const accessToken =
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    "";
  const grantType =
    localStorage.getItem(GRANT_TYPE_KEY) ||
    sessionStorage.getItem(GRANT_TYPE_KEY) ||
    "Bearer";

  return { accessToken, grantType };
}

export function clearStoredAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(GRANT_TYPE_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(GRANT_TYPE_KEY);
}

function getPreferredStorage() {
  const hasLocalAuth =
    !!localStorage.getItem(ACCESS_TOKEN_KEY) ||
    !!localStorage.getItem(GRANT_TYPE_KEY);
  return hasLocalAuth ? localStorage : sessionStorage;
}

export function setStoredAuth(accessToken: string, grantType: string) {
  const storage = getPreferredStorage();
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  storage.setItem(GRANT_TYPE_KEY, grantType);
}

