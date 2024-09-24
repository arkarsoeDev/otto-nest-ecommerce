import { OrderQueryDto, CreateOrderDto, PaginatedDataDto, UpdateOrderDto } from "@/core/models";
import { Order } from "../entities";
export interface OrderService {

  create(payload: CreateOrderDto): Promise<string>;

  findOne(id: string): Promise<Order>;

  findAll(query: OrderQueryDto): Promise<PaginatedDataDto<Order>>;

  update(payload: UpdateOrderDto): Promise<Order>;

  delete(id: string): Promise<void>;
}

export const ORDER_SERVICE = 'OrderService';
