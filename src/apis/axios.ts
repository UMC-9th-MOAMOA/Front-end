import axios from "axios";
import { attachInterceptors } from "./interceptors";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createInstance = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

// 인증 불필요한 요청 (로그인, 회원가입 등)
export const publicAPI = createInstance();

// 인증 필요한 요청 (토큰 자동 부여 + 리프레시 자동 재시도)
export const authAPI = createInstance();
attachInterceptors(authAPI);
