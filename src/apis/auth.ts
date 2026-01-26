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

export async function login(email: string, password: string) {
  return publicFetch<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
