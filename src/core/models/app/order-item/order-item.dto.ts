export class OrderItemDto {
  id: string

  orderId: string
  productId: string
  quantity: number
  price: number

  constructor(partial: Partial<OrderItemDto> = {}) {
    Object.assign(this, partial);
  }
}
