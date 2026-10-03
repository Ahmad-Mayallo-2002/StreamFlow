interface Pagination {
  next: boolean;
  prev: boolean;
  currentPage: number;
  totalPages: number;
  counts: number;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: Pagination;
}
