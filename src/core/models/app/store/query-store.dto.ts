import { QueryDto } from '@/core/models';

export class StoreQueryDto extends QueryDto {
  term?: string;
  userId?: string;
}
