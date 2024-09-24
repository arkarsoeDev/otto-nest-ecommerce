import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class QueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  static getPageable(q: QueryDto) {
    const page = (q.page ?? 1) - 1;
    const limit = q.limit;
    const offset = !!limit ? (page >= 0 ? page : 0) * limit : undefined;
    return {
      limit: limit,
      offset: offset,
    };
  }
}
