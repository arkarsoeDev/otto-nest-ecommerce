import { QueryDto } from '@/core/models';

export class SizeQueryDto extends QueryDto {
  term?: string;
  storeId?: string;
}
