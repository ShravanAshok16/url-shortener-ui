import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteLink } from '../../../api/links';
import type { LinkListItem, PagedResponse } from '../../../api/types';

// ---------------------------------------------------------------------------
// Single delete
// ---------------------------------------------------------------------------
export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['links'] });

      const previous = queryClient.getQueriesData<PagedResponse<LinkListItem>>({
        queryKey: ['links'],
      });

      queryClient.setQueriesData<PagedResponse<LinkListItem>>(
        { queryKey: ['links'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.filter((item) => item.id !== id),
            totalCount: old.totalCount - 1,
          };
        }
      );

      return { previous };
    },
    onError: (error: Error, _id, context) => {
      if (context?.previous) {
        for (const [key, data] of context.previous) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Link deleted');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
}

// ---------------------------------------------------------------------------
// Batch delete
// ---------------------------------------------------------------------------
export function useBatchDeleteLinks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      // Fire all delete requests in parallel
      await Promise.all(ids.map((id) => deleteLink(id)));
      return ids;
    },
    onMutate: async (ids) => {
      // Cancel in-flight queries so they don't overwrite the optimistic update
      await queryClient.cancelQueries({ queryKey: ['links'] });

      // Snapshot for rollback
      const previous = queryClient.getQueriesData<PagedResponse<LinkListItem>>({
        queryKey: ['links'],
      });

      // Remove all selected ids from every cached list
      queryClient.setQueriesData<PagedResponse<LinkListItem>>(
        { queryKey: ['links'] },
        (old) => {
          if (!old) return old;
          const idSet = new Set(ids);
          const filtered = old.items.filter((item) => !idSet.has(item.id));
          return {
            ...old,
            items: filtered,
            totalCount: Math.max(0, old.totalCount - (old.items.length - filtered.length)),
          };
        }
      );

      return { previous };
    },
    onError: (error: Error, _ids, context) => {
      // Rollback on failure
      if (context?.previous) {
        for (const [key, data] of context.previous) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error(`Failed to delete: ${error.message}`);
    },
    onSuccess: (_data, ids) => {
      toast.success(`${ids.length} ${ids.length === 1 ? 'link' : 'links'} deleted`);
    },
    onSettled: () => {
      // Sync with server to catch any inconsistencies
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
}