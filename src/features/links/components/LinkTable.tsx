import { Trash2 } from 'lucide-react';
import type { LinkListItem } from '../../../api/types';
import { Button } from '../../../components/ui/Button';
import { formatRelative } from '../../../lib/format';
import { CopyButton } from './CopyButton';
import { cn } from '../../../lib/utils';

interface Props {
  links: LinkListItem[];
  onDelete: (link: LinkListItem) => void;
  selectedIds: Set<string>;
  onToggleSelection: (id: string) => void;
  onToggleAll: () => void;
}

export function LinkTable({
  links,
  onDelete,
  selectedIds,
  onToggleSelection,
  onToggleAll,
}: Props) {
  const allSelected = links.length > 0 && selectedIds.size === links.length;

  return (
    <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-surface">
          <tr className="text-left text-sm font-medium text-text-secondary">
            <th className="px-4 py-3 w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                className="rounded border-border text-brand focus:ring-brand cursor-pointer"
                aria-label="Select all links on this page"
              />
            </th>
            <th className="px-4 py-3">Short URL</th>
            <th className="px-4 py-3">Original</th>
            <th className="px-4 py-3">Clicks</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr
              key={link.id}
              className={cn(
                'border-t border-border hover:bg-surface transition-colors',
                selectedIds.has(link.id) && 'bg-surface'
              )}
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.has(link.id)}
                  onChange={() => onToggleSelection(link.id)}
                  className="rounded border-border text-brand focus:ring-brand cursor-pointer"
                  aria-label={`Select link ${link.shortCode}`}
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-brand hover:underline"
                  >
                    {link.shortCode}
                  </a>
                  <CopyButton value={link.shortUrl} />
                </div>
              </td>
              <td className="px-4 py-3 max-w-xs">
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-brand truncate block"
                  title={link.originalUrl}
                >
                  {link.originalUrl}
                </a>
              </td>
              <td className="px-4 py-3 text-sm text-text">
                {link.clickCount.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-text-secondary">
                {formatRelative(link.createdAt)}
              </td>
              <td className="px-4 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(link)}
                  aria-label="Delete link"
                >
                  <Trash2 className="h-4 w-4 text-error" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}