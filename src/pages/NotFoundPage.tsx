import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-text-secondary mb-6">Page not found.</p>
            <Link to="/">
              <Button>Go home</Button>
            </Link>
          </div>
        </Container>
      </main>
    </>
  );
}