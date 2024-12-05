/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { InternalAxiosRequestConfig } from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
  }
  config.withCredentials = false;
  return config;
}

function authResponseErrorInterceptor(error: any) {
  const message = error.response?.data?.message || error.message;

  console.error(message);
  return Promise.reject(error);
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(authRequestInterceptor);

axiosInstance.interceptors.response.use(
  undefined,
  authResponseErrorInterceptor
);

export default axiosInstance;

export const baseUrl = import.meta.env.VITE_API_URL;
