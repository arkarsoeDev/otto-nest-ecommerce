import { IsNotEmpty, IsString } from "class-validator"

export class CreateBillboardDto {
  @IsNotEmpty()
  @IsString()
  label: string

  @IsNotEmpty()
  @IsString()
  storeId: string

  @IsNotEmpty()
  @IsString()
  imageUrl: string
}
