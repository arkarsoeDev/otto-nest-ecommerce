import { IsNotEmpty, IsString } from "class-validator"

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  value: string

  @IsNotEmpty()
  @IsString()
  storeId: string
}
