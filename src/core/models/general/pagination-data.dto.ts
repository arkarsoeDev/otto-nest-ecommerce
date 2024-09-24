export class PaginatedDataDto<T> {
  list: T[];
  count: number;
  offset: number;
  limit: number;

  constructor(partial: Partial<PaginatedDataDto<T>> = {}) {
    Object.assign(this, partial);
  }
}
