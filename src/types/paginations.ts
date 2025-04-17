export type PaginationInfo = {
    totalPages: number;
    totalElements: number;
    currentPage: number;
};

export type PaginatedResponse<T> = {
  data: T[]; 
  totalPages: number;
  totalElements: number;
  currentPage: number;
};