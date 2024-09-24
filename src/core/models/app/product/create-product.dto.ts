import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  storeId: string

  @IsNotEmpty()
  @IsString()
  categoryId: string

  @IsNotEmpty()
  @IsString()
  sizeId: string

  @IsNotEmpty()
  @IsString()
  colorId: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsOptional()
  @IsBoolean()
  isFeatured: boolean

  @IsOptional()
  @IsBoolean()
  isArchived: boolean

  @IsNotEmpty()
  images: {
    url: string
  }[]
}
