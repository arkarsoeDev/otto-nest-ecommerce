import { Type } from "class-transformer";
import { StoreDto } from "../store/store.dto";

export class BillboardDto {
  id: string
  storeId: string
  label: string
  imageUrl: string

  @Type(() => StoreDto)
  store?: StoreDto

  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<BillboardDto> = {}) {
    Object.assign(this, partial);
  }
}
