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
): Promise<{ link: CreateLinkResponse; isNew: boolean }> {
  const response = await apiClient.post<CreateLinkResponse>('/api/Links', data);
  
  // 201 Created = new link, 200 OK = existing link returned
  return {
    link: response.data,
    isNew: response.status === 201
  };
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