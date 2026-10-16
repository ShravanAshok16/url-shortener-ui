import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/auth-context';
import type { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-text-muted">Loading…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Save where the user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}