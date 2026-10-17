import type { ReactNode } from 'react';
import { Link2 } from 'lucide-react';

interface Props {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface mb-4">
        {icon ?? <Link2 className="h-6 w-6 text-text-muted" />}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
        {description}
      </p>
      {action}
    </div>
  );
}