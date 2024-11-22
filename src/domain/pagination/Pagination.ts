export interface Pagination<T> {
  currentPage: number;
  perPage: number;
  total: number;
  items: T[];
}
