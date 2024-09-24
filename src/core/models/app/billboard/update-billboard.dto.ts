import { PartialType } from "@nestjs/mapped-types";
import { CreateBillboardDto } from "./create-billboard.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateBillboardDto extends PartialType(CreateBillboardDto) {
  @IsOptional()
  @IsString()
  id?: string
}
