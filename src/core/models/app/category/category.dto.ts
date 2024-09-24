export class CategoryDto {
  id: string
  name: string
  billboardId: string
  storeId: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<CategoryDto> = {}) {
    Object.assign(this, partial);
  }
}
