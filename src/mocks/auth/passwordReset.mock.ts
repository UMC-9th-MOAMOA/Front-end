export type MockSendResult = "SUCCESS" | "USER_NOT_FOUND";
export type MockVerifyResult = "SUCCESS" | "INVALID_CODE" | "CODE_EXPIRED";

export function mockSendResetEmail(
  _email: string,
  result: MockSendResult = "SUCCESS"
) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (result === "SUCCESS") {
        resolve();
      } else {
        reject({ response: { data: { code: "USER_NOT_FOUND" } } });
      }
    }, 500);
  });
}

export function mockVerifyResetCode(
  _email: string,
  _code: string,
  result: MockVerifyResult = "SUCCESS"
) {
  return new Promise<{ resetToken: string }>((resolve, reject) => {
    setTimeout(() => {
      if (result === "SUCCESS") {
        resolve({ resetToken: "MOCK_RESET_TOKEN" });
      } else if (result === "INVALID_CODE") {
        reject({ response: { data: { code: "INVALID_CODE" } } });
      } else {
        reject({ response: { data: { code: "CODE_EXPIRED" } } });
      }
    }, 500);
  });
}
