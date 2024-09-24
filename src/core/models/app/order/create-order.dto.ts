import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  storeId: string;

  userId?: string;

  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
