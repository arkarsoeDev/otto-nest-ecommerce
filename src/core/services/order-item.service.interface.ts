import { OrderItemQueryDto, CreateOrderItemDto, PaginatedDataDto, CreateManyOrderItemDto } from "@/core/models";
import { OrderItem } from "../entities";
import { EntityManager } from "typeorm";
export interface OrderItemService {

  create(payload: CreateOrderItemDto): Promise<string>;

  createMany(payload: CreateManyOrderItemDto, emSrc?: EntityManager): Promise<OrderItem[]>;

  findOne(id: string): Promise<OrderItem>;

  findAll(query: OrderItemQueryDto): Promise<PaginatedDataDto<OrderItem>>;
}

export const ORDER_ITEM_SERVICE = 'OrderItemService';
