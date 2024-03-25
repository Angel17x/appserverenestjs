export interface PaginateResponse<T> {
  status: number;
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
} 