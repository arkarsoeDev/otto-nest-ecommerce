import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyOrderItemDto, CreateOrderItemDto, OrderItemQueryDto, QueryDto } from '@/core/models';
import { OrderItemService } from '@/core/services/order-item.service.interface';
import { OrderItem } from '@/core/entities';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';

@Injectable()
export class TypeormOrderItemService implements OrderItemService {
  constructor(private dataSource: DataSource, @InjectRepository(OrderItem) private repo: Repository<OrderItem>) { }

  async create(createOrderItemDto: CreateOrderItemDto) {

    return this.dataSource.transaction(async (em) => {
      const orderItem = em.create(OrderItem, { ...createOrderItemDto })

      const data = await em.save(orderItem)

      return data.id
    })
  }

  async createMany(createManyOrderItemDto: CreateManyOrderItemDto, emSrc: EntityManager) {

    if (emSrc) {
      return this.dataSource.transaction(async () => {
        const orderItem = emSrc.create(OrderItem, createManyOrderItemDto.data)

        const data = await emSrc.save(orderItem)

        return data
      })
    } else
      return this.dataSource.transaction(async (em) => {
        const orderItem = em.create(OrderItem, createManyOrderItemDto.data)

        const data = await em.save(orderItem)

        return data
      })


  }

  async findOne(id: string) {
    const orderItem = await this.repo.findOne({ where: { id } })

    if (!orderItem) {
      throw customHttpResponse.NotFoundException({ message: 'OrderItem not found!' })
    }

    return orderItem
  }

  async findAll(query: OrderItemQueryDto): Promise<PaginatedDataDto<OrderItem>> {
    const { limit, offset } = QueryDto.getPageable(query);

    const list = await this.repo.find({ where: { orderId: query.term }, skip: offset, take: limit })

    const count = await this.repo.count({ where: { orderId: query.term } })

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }
}
