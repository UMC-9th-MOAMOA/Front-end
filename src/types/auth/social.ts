import type { LoginResult } from "./login";

export interface SocialLoginTokenRequest {
  code: string;
}

export type SocialLoginResult = LoginResult;
