import { IPagination } from './pagination.interface';

export interface IPaginatedData<T> {
  pagination: IPagination;
  data: T[];
}
