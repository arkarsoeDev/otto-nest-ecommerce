import { Exclude } from "class-transformer"

export class StoreDto {
  id: string
  name: string
  userId: string

  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date

  constructor(partial: Partial<StoreDto> = {}) {
    Object.assign(this, partial);
  }
}
