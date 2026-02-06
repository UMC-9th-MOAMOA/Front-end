export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

export type ChangePasswordResult = string;
