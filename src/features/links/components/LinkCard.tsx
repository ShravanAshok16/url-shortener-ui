import { Trash2 } from 'lucide-react';
import type { LinkListItem } from '../../../api/types';
import { CopyButton } from './CopyButton';
import { Button } from '../../../components/ui/Button';
import { formatRelative } from '../../../lib/format';
import { cn } from '../../../lib/utils';

interface Props {
  link: LinkListItem;
  onDelete: (link: LinkListItem) => void;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
}

export function LinkCard({ link, onDelete, isSelected, onToggleSelection }: Props) {
  return (
    <div
      className={cn(
        'md:hidden rounded-lg border border-border p-4',
        isSelected && 'bg-surface border-brand/50'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelection(link.id)}
            className="mt-1 rounded border-border text-brand focus:ring-brand cursor-pointer"
            aria-label={`Select link ${link.shortCode}`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <a
                href={link.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-brand hover:underline truncate"
              >
                {link.shortCode}
              </a>
              <CopyButton value={link.shortUrl} />
            </div>
            <a
              href={link.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-brand truncate block mt-1"
              title={link.originalUrl}
            >
              {link.originalUrl}
            </a>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(link)}
          aria-label="Delete link"
        >
          <Trash2 className="h-4 w-4 text-error" />
        </Button>
      </div>
      <div className="flex items-center justify-between text-xs text-text-muted mt-3 pl-7">
        <span>{link.clickCount.toLocaleString()} clicks</span>
        <span>{formatRelative(link.createdAt)}</span>
      </div>
    </div>
  );
}