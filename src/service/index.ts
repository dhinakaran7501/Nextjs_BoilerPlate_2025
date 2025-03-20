// utils/axiosInstance.ts

import { Env } from "@/libs/Env";
import { deleteCookie, getCookie, setCookie } from "@/utils/helpers";
import { CookieKey } from "@/utils/secureKeys";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: Env.NEXT_PUBLIC_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie(CookieKey);
        const response = await axios.post(
          `${Env.NEXT_PUBLIC_APP_URL}/auth/refresh-token`,
          {
            token: refreshToken,
          },
        );

        const { status, message, data } = response.data;
        if (status) {
          console.log(message);
          setCookie(CookieKey, data?.token, 1);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${data?.token}`;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data?.token}`;
          }
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        deleteCookie(CookieKey);
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
