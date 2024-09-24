import { IsNotEmpty, IsString } from "class-validator"

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  url: string

  @IsNotEmpty()
  @IsString()
  productId: string
}
