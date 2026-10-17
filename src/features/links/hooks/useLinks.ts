import { useQuery } from '@tanstack/react-query';
import { listLinks } from '../../../api/links';

interface Params {
  page: number;
  pageSize: number;
  search?: string;
  sort?: string;
  isActive?: boolean;
}

export function useLinks(params: Params) {
  return useQuery({
    queryKey: ['links', params],
    queryFn: () => listLinks(params),
    placeholderData: (previousData) => previousData,
  });
}