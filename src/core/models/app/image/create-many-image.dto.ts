import { CreateImageDto } from "./create-image.dto"
import { Type } from "class-transformer"

export class CreateManyImageDto {
  @Type(() => CreateImageDto)
  data: CreateImageDto[]
}
