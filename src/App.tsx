import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Card } from './components/ui/Card';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-brand">URL Shortener</h1>

      <Card className="w-full max-w-md flex flex-col gap-4">
        <Input label="Email" placeholder="you@example.com" name="email" />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          name="password"
          helperText="Minimum 8 characters"
        />
        <Input
          label="With error"
          name="error-demo"
          error="This field is required."
        />

        <div className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <Button loading>Loading...</Button>
      </Card>

      <p className="text-sm text-text-muted font-mono">
        API: {import.meta.env.VITE_API_URL}
      </p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  );
}