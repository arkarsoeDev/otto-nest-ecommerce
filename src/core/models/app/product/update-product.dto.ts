import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { IsEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  id?: string

  @IsEmpty()
  storeId: string
}
