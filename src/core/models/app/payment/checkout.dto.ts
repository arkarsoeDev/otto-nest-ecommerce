import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CheckoutDto {
  @IsNotEmpty()
  @IsString()
  storeId: string;

  userId?: string;

  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsNotEmpty()
  cart: {
    productId: string
    price: number
    quantity: number
  }[]
}
