export interface Paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    prev: string;
    next: string;
  };
}
