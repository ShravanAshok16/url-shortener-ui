import axios, { AxiosError } from 'axios';
import type { ApiError } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5029';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request (once auth is wired)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize errors so components always get Error.message
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Stale or missing token — clear it. Routing handles the redirect.
      localStorage.removeItem('token');
    }

    const message =
      error.response?.data?.error ??
      error.message ??
      'Something went wrong. Please try again.';

    return Promise.reject(new Error(message));
  }
);