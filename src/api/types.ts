// ---- Auth ----

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  expiresAt: string;
}

// ---- Links ----

export interface CreateLinkRequest {
  originalUrl: string;
  expiresAt?: string | null;
}

export interface CreateLinkResponse {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: string;
  expiresAt: string | null;
}

export interface LinkListItem {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// ---- Errors ----

export interface ApiError {
  error: string;
  code?: string;
  traceId?: string;
}