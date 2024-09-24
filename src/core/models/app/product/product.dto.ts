export class ProductDto {
  id: string;

  storeId: string;
  categoryId: string;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  colorId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ProductDto> = {}) {
    Object.assign(this, partial);
  }
}
