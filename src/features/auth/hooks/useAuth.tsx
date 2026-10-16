import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as authApi from '../../../api/auth';
import { tokenStorage } from '../../../api/client';
import type { AuthResponse } from '../../../api/types';
import { AuthContext, type AuthState } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  // Lazy initializer — reads localStorage once, before first render
  const [email, setEmail] = useState<string | null>(() => {
    const token = tokenStorage.get();
    const storedEmail = localStorage.getItem('url-shortener-email');
    return token && storedEmail ? storedEmail : null;
  });

  const [isLoading] = useState(false);

  // React to 401 responses — clear state
  useEffect(() => {
    const handleUnauthorized = () => {
      tokenStorage.clear();
      localStorage.removeItem('url-shortener-email');
      setEmail(null);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () =>
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const handleAuthSuccess = useCallback((response: AuthResponse) => {
    tokenStorage.set(response.token);
    localStorage.setItem('url-shortener-email', response.email);
    setEmail(response.email);
  }, []);

  const register = useCallback(
    async (email: string, password: string) => {
      const response = await authApi.register({ email, password });
      handleAuthSuccess(response);
    },
    [handleAuthSuccess]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await authApi.login({ email, password });
      handleAuthSuccess(response);
    },
    [handleAuthSuccess]
  );

  const logout = useCallback(() => {
    tokenStorage.clear();
    localStorage.removeItem('url-shortener-email');
    setEmail(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      email,
      isAuthenticated: !!email,
      isLoading,
      register,
      login,
      logout,
    }),
    [email, isLoading, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}