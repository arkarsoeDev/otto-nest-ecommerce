import { PartialType } from "@nestjs/mapped-types";
import { CreateSizeDto } from "./create-size.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateSizeDto extends PartialType(CreateSizeDto) {
  @IsOptional()
  @IsString()
  id?: string
}
