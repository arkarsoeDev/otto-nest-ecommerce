import { QueryDto } from '@/core/models';

export class BillboardQueryDto extends QueryDto {
  term?: string;
  storeId?: string;
}
