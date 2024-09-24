export class ColorDto {
  id: string

  name: string
  value: string
  storeId: string

  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<ColorDto> = {}) {
    Object.assign(this, partial);
  }
}
