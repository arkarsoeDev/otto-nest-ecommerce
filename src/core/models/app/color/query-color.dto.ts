import { QueryDto } from '@/core/models';

export class ColorQueryDto extends QueryDto {
  term?: string;
  storeId?: string;
}
