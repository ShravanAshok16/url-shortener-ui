import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { createLink } from '../api/links';
import type { CreateLinkResponse } from '../api/types';
import { useAuth } from '../features/auth/hooks/auth-context';

export function LandingPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<CreateLinkResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (originalUrl: string) => createLink({ originalUrl }),
    onSuccess: (data) => {
      setResult(data);
      setError(null);
      setUrl('');
    },
    onError: (err: Error) => {
      setError(err.message);
      setResult(null);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isAuthenticated) {
      navigate('/register');
      return;
    }

    mutation.mutate(url.trim());
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.shortUrl);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] flex flex-col">
        <Container>
          <div className="max-w-2xl mx-auto text-center mt-16 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-text mb-4">
              Shorten URLs.
              <br />
              Track clicks.
            </h1>
            <p className="text-lg text-text-secondary">
              Free, fast, and simple. Paste a long URL and get a short one in seconds.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="https://example.com/very/long/url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  error={error ?? undefined}
                  aria-label="URL to shorten"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                loading={mutation.isPending}
                className="sm:self-start"
              >
                Shorten
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {result && (
              <div className="mt-6 p-4 rounded-md bg-brand-subtle border border-brand/20">
                <p className="text-sm text-text-secondary mb-2">Your short URL:</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <code className="flex-1 font-mono text-sm text-brand break-all">
                    {result.shortUrl}
                  </code>
                  <Button variant="secondary" size="sm" onClick={handleCopy}>
                    Copy
                  </Button>
                </div>
                {!result.expiresAt && (
                  <p className="text-xs text-text-muted mt-3">
                    No expiry — this link works forever.
                  </p>
                )}
              </div>
            )}

            {mutation.isError && (
              <p className="mt-3 text-sm text-error">
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : 'Something went wrong.'}
              </p>
            )}
          </Card>

          {!result && (
            <p className="text-center text-sm text-text-muted mt-8">
              Want to save and manage your links?{' '}
              <Link to="/register" className="text-brand hover:underline">
                Create a free account
              </Link>
            </p>
          )}
        </Container>
      </main>
    </>
  );
}