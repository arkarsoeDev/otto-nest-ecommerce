import { QueryDto } from '@/core/models';

export class CategoryQueryDto extends QueryDto {
  term?: string;
  storeId?: string;
}
