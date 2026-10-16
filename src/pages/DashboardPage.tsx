import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { useAuth } from '../features/auth/hooks/auth-context';

export function DashboardPage() {
  const { email } = useAuth();

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <Card>
            <p className="text-text-secondary">
              Signed in as{' '}
              <span className="font-medium text-text">{email}</span>
            </p>
            <p className="text-sm text-text-muted mt-4">
              Your links will appear here tomorrow. 🚀
            </p>
          </Card>
        </Container>
      </main>
    </>
  );
}