import { OrderItem } from "@/core/entities";
import { Type } from "class-transformer";

export class OrderDto {
  id: string

  storeId: string;
  userId?: string;
  isPaid: boolean;
  phone: string;
  address: string;

  @Type(() => OrderItem)
  orderItems: OrderItem[]

  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<OrderDto> = {}) {
    Object.assign(this, partial);
  }
}
