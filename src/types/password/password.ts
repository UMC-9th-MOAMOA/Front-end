export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

export type ChangePasswordResult = string;

export type PasswordResetEmailResult = null;

export interface PasswordResetVerificationResult {
  resetToken: string;
}

export type PasswordResetResult = null;

export interface PasswordResetRequest {
  token: string;
  newPassword: string;
  newPasswordCheck: string;
}
