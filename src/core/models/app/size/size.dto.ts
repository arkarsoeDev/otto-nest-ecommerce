export class SizeDto {
  id: string

  name: string
  value: string
  storeId: string

  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<SizeDto> = {}) {
    Object.assign(this, partial);
  }
}
