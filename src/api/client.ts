import axios, { AxiosError } from 'axios';
import type { ApiError } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5029';

const TOKEN_KEY = 'url-shortener-token';

// Token storage helpers — single source of truth
export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();
      // Dispatch an event so the auth context can react
      window.dispatchEvent(new Event('auth:unauthorized'));
    }

    const message =
      error.response?.data?.error ??
      error.message ??
      'Something went wrong. Please try again.';

    return Promise.reject(new Error(message));
  }
);