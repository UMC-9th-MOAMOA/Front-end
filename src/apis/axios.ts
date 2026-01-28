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

export const publicAPI = createInstance();

export const authAPI = createInstance();
attachInterceptors(authAPI);
