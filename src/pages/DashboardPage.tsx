import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { EmptyState } from '../components/ui/EmptyState';
import { Dialog } from '../components/ui/Dialog';
import { LinkTable } from '../features/links/components/LinkTable';
import { LinkCard } from '../features/links/components/LinkCard';
import { LinkSkeleton } from '../features/links/components/LinkSkeleton';
import { Pagination } from '../features/links/components/Pagination';
import { DeleteDialog } from '../features/links/components/DeleteDialog';
import { useLinks } from '../features/links/hooks/useLinks';
import { useBatchDeleteLinks } from '../features/links/hooks/useDeleteLink';
import type { LinkListItem } from '../api/types';

export function DashboardPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('created_desc');
  const [deleteTarget, setDeleteTarget] = useState<LinkListItem | null>(null);

  // Batch selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBatchDelete, setShowBatchDelete] = useState(false);

  // Data fetching
  const { data, isLoading, isError, error } = useLinks({
    page,
    pageSize: 10,
    search: search.trim() || undefined,
    sort,
    isActive: true,
  });

  const batchMutation = useBatchDeleteLinks();

  const links = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const totalCount = data?.totalCount ?? 0;

  // Selection handlers
  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === links.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(links.map((l) => l.id)));
    }
  };

  const handleBatchDelete = () => {
    batchMutation.mutate(Array.from(selectedIds), {
      onSuccess: () => {
        setSelectedIds(new Set());
        setShowBatchDelete(false);
      },
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelectedIds(new Set());
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    setSelectedIds(new Set());
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
    setSelectedIds(new Set());
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Your links</h1>
              {!isLoading && (
                <p className="text-sm text-text-muted mt-1">
                  {totalCount} {totalCount === 1 ? 'link' : 'links'}
                </p>
              )}
            </div>
            <Link to="/">
              <Button>
                <Plus className="h-4 w-4" />
                New link
              </Button>
            </Link>
          </div>

          {/* Filters */}
          {!isLoading && links.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search by URL..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  aria-label="Search links"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-10 rounded-md border border-border bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-label="Sort links"
              >
                <option value="created_desc">Newest first</option>
                <option value="created_asc">Oldest first</option>
                <option value="clicks_desc">Most clicks</option>
                <option value="clicks_asc">Fewest clicks</option>
              </select>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <LinkSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="text-center py-12">
              <p className="text-sm text-error">
                {error instanceof Error ? error.message : 'Failed to load links'}
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && links.length === 0 && (
            <div className="rounded-lg border border-border bg-white">
              <EmptyState
                title={search ? 'No links match your search' : 'No links yet'}
                description={
                  search
                    ? 'Try a different search term.'
                    : 'Shorten your first URL to get started.'
                }
                action={
                  !search && (
                    <Link to="/">
                      <Button>
                        <Plus className="h-4 w-4" />
                        Create your first link
                      </Button>
                    </Link>
                  )
                }
              />
            </div>
          )}

          {/* Data state */}
          {!isLoading && !isError && links.length > 0 && (
            <>
              <LinkTable
                links={links}
                onDelete={setDeleteTarget}
                selectedIds={selectedIds}
                onToggleSelection={toggleSelection}
                onToggleAll={toggleSelectAll}
              />
              <div className="flex flex-col gap-3 md:hidden">
                {links.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onDelete={setDeleteTarget}
                    isSelected={selectedIds.has(link.id)}
                    onToggleSelection={toggleSelection}
                  />
                ))}
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Container>
      </main>

      {/* Single Delete Dialog */}
      {deleteTarget && (
        <DeleteDialog
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          linkId={deleteTarget.id}
          shortUrl={deleteTarget.shortUrl}
        />
      )}

      {/* Batch Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-white border border-border shadow-lg rounded-full px-4 py-2 flex items-center gap-4">
            <span className="text-sm font-medium">
              {selectedIds.size} selected
            </span>
            <div className="h-4 w-px bg-border" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIds(new Set())}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowBatchDelete(true)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Batch Delete Confirmation Dialog */}
      <Dialog
        open={showBatchDelete}
        onClose={() => setShowBatchDelete(false)}
        title={`Delete ${selectedIds.size} links?`}
      >
        <p className="text-sm text-text-secondary mb-6">
          Are you sure you want to delete {selectedIds.size} links? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowBatchDelete(false)}
            disabled={batchMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleBatchDelete}
            loading={batchMutation.isPending}
          >
            Delete {selectedIds.size} links
          </Button>
        </div>
      </Dialog>
    </>
  );
}