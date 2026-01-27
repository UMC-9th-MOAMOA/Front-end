const ACCESS_TOKEN_KEY = "accessToken";
const GRANT_TYPE_KEY = "grantType";
const PREFERRED_STORAGE_KEY = "preferredAuthStorage";

export type AuthStoragePreference = "local" | "session";

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
  localStorage.removeItem(PREFERRED_STORAGE_KEY);
}

function resolveStorage(preference: AuthStoragePreference) {
  return preference === "local" ? localStorage : sessionStorage;
}

export function getPreferredStorage(): AuthStoragePreference {
  const storedPreference = localStorage.getItem(PREFERRED_STORAGE_KEY);
  if (storedPreference === "local" || storedPreference === "session") {
    return storedPreference;
  }

  const hasLocalAuth =
    !!localStorage.getItem(ACCESS_TOKEN_KEY) ||
    !!localStorage.getItem(GRANT_TYPE_KEY);
  return hasLocalAuth ? "local" : "session";
}

export function setPreferredStorage(preference: AuthStoragePreference) {
  localStorage.setItem(PREFERRED_STORAGE_KEY, preference);
}

type SetStoredAuthOptions = {
  autoLogin?: boolean;
  preferredStorage?: AuthStoragePreference;
};

export function setStoredAuth(
  accessToken: string,
  grantType: string,
  options?: SetStoredAuthOptions
) {
  const preferenceFromAutoLogin =
    options?.autoLogin === undefined
      ? undefined
      : options.autoLogin
        ? "local"
        : "session";
  const preference = options?.preferredStorage ?? preferenceFromAutoLogin;

  if (preference) {
    setPreferredStorage(preference);
  }

  const preferredStorage = resolveStorage(preference ?? getPreferredStorage());
  const otherStorage =
    preferredStorage === localStorage ? sessionStorage : localStorage;

  otherStorage.removeItem(ACCESS_TOKEN_KEY);
  otherStorage.removeItem(GRANT_TYPE_KEY);

  const storage = preferredStorage;
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  storage.setItem(GRANT_TYPE_KEY, grantType);
}
