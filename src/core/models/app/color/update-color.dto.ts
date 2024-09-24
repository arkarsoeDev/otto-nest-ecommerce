import { PartialType } from "@nestjs/mapped-types";
import { CreateColorDto } from "./create-color.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateColorDto extends PartialType(CreateColorDto) {
  @IsOptional()
  @IsString()
  id?: string
}
