import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderQueryDto, QueryDto } from '@/core/models';
import { OrderService } from '@/core/services/order.service.interface';
import { Order } from '@/core/entities';
import { CreateOrderDto } from '@/core/models/app/order/create-order.dto';
import { UpdateOrderDto } from '@/core/models/app/order/update-order.dto';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';
import { ORDER_ITEM_SERVICE, OrderItemService } from '@/core/services';

@Injectable()
export class TypeormOrderService implements OrderService {
  constructor(private dataSource: DataSource, @InjectRepository(Order) private repo: Repository<Order>, @Inject(ORDER_ITEM_SERVICE) private orderItemService: OrderItemService) { }

  async create(createOrderDto: CreateOrderDto) {

    return this.dataSource.transaction(async (em) => {
      const order = em.create(Order, { ...createOrderDto })

      const data = await em.save(order)

      return data.id
    })
  }

  async findOne(id: string) {
    const order = await this.repo.findOne({ where: { id } })

    if (!order) {
      throw customHttpResponse.NotFoundException({ message: 'Order not found!' })
    }

    return order
  }

  async findAll(query: OrderQueryDto): Promise<PaginatedDataDto<Order>> {
    const { limit, offset } = QueryDto.getPageable(query);

    const list = await this.repo.find({ where: { phone: query.term }, relations: ['orderItems.product'], skip: offset, take: limit })

    const count = await this.repo.count({ where: { phone: query.term } })

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }

  async update(payload: UpdateOrderDto) {
    const { id, ...attrs } = payload

    const order = await this.findOne(id)

    if (!order) {
      throw customHttpResponse.NotFoundException({ message: 'Order not found!' })
    }

    Object.assign(order, attrs)

    await this.repo.save(order)

    return order
  }

  async delete(id: string) {
    const order = await this.findOne(id)

    await this.repo.remove(order)
  }
}
