export interface PaginationResponseState<T> {
  isLoading: boolean;
  count: number;
  next?: string;
  previous?: string;
  limit: number;
  page: number;
  results: T;
  isDataExist?: boolean;
}

export interface ResponseState<T> {
  isLoading: boolean;
  isDataExist?: boolean;
  data: T;
}
