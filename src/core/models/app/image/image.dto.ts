export class ImageDto {
  id: string

  url: string
  productId: string

  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<ImageDto> = {}) {
    Object.assign(this, partial);
  }
}
