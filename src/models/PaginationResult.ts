export interface PaginationResult<T> {
  items: Array<T>,
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
}