import { QueryDto } from '@/core/models';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserQueryDto extends QueryDto {
  @IsString()
  @IsOptional()
  term: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;
}
