import { ApiProperty } from "@nestjs/swagger";
import { PaginatedDataDto } from "./pagination-data.dto";

export class PaginatedResponseDto<T> {
  @ApiProperty()
  content: T[];
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  totalPage: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  totalElements: number;

  constructor(partial: Partial<PaginatedResponseDto<T>> = {}) {
    Object.assign(this, partial);
  }

  static from<T>({
    list,
    count,
    offset = 0,
    limit = 0,
  }: PaginatedDataDto<T>): PaginatedResponseDto<T> {
    if (limit <= 0) {
      return new PaginatedResponseDto({
        content: list,
        currentPage: count > 0 ? 1 : 0,
        totalPage: count > 0 ? 1 : 0,
        pageSize: count,
        totalElements: count,
      });
    }
    const totalPage = Math.ceil(count / limit);
    return new PaginatedResponseDto({
      content: list,
      // prettier-ignore
      currentPage: count > 0 ? (offset / limit) + 1 : 0,
      totalPage: totalPage,
      pageSize: list.length,
      totalElements: count,
    });
  }
}
