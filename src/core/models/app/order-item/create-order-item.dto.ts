import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  orderId: string

  @IsNotEmpty()
  @IsString()
  productId: string

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsNotEmpty()
  @IsNumber()
  price: number
}
