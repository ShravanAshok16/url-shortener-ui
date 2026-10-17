import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Link as LinkIcon, LayoutDashboard } from 'lucide-react'; // Add LayoutDashboard
import { Button } from '../ui/Button';
import { useAuth } from '../../features/auth/hooks/auth-context';

export function Header() {
  const { isAuthenticated, email, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-border bg-white sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-brand font-semibold text-lg"
        >
          <LinkIcon className="h-5 w-5" />
          URL Shortener
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* ADD THIS: Dashboard Link */}
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-brand">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Dashboard</span>
              </Button>
            </Link>

            <span className="text-sm text-text-muted hidden md:inline border-l border-border pl-4">
              {email}
            </span>
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button size="sm" onClick={() => navigate('/register')}>
              Sign up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}