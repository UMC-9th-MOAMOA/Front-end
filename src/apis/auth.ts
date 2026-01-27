import { publicFetch } from "./http";

export type LoginResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
  };
};

export type RecoverResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
  };
};

export type RefreshResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    grantType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
  } | null;
};

export async function login(email: string, password: string) {
  return publicFetch<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function recoverAccount(email: string, password: string) {
  return publicFetch<RecoverResponse>("/api/v1/auth/recover", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function refreshAccessToken() {
  return publicFetch<RefreshResponse>("/api/v1/auth/refresh", {
    method: "POST",
  });
}
