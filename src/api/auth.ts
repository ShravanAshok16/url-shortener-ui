import { apiClient } from './client';
import type { AuthResponse, LoginRequest, RegisterRequest } from './types';

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const { data: response } = await apiClient.post<AuthResponse>(
    '/api/Auth/register',
    data
  );
  return response;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const { data: response } = await apiClient.post<AuthResponse>(
    '/api/Auth/login',
    data
  );
  return response;
}