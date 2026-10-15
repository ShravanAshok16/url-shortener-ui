import { apiClient } from './client';
import type {
  CreateLinkRequest,
  CreateLinkResponse,
  LinkListItem,
  PagedResponse,
} from './types';

export interface ListLinksParams {
  page?: number;
  pageSize?: number;
  isActive?: boolean;
  search?: string;
  sort?: string;
}

export async function createLink(
  data: CreateLinkRequest
): Promise<CreateLinkResponse> {
  const { data: response } = await apiClient.post<CreateLinkResponse>(
    '/api/Links',
    data
  );
  return response;
}

export async function listLinks(
  params?: ListLinksParams
): Promise<PagedResponse<LinkListItem>> {
  const { data: response } = await apiClient.get<PagedResponse<LinkListItem>>(
    '/api/Links',
    { params }
  );
  return response;
}

export async function deleteLink(id: string): Promise<void> {
  await apiClient.delete(`/api/Links/${id}`);
}