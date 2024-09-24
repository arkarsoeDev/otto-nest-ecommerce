import { QueryDto } from '@/core/models';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class ProductQueryDto extends QueryDto {
  term?: string;

  @IsOptional()
  @IsUUID()
  storeId?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isFeatured?: boolean

  @IsOptional()
  @IsUUID()
  sizeId?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  colorId?: string;
}
