import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderItemDto } from "./create-order-item.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @IsOptional()
  @IsString()
  id?: string
}
