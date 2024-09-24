import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { OrderDto, OrderQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateOrderDto } from '@/core/models/app/order/create-order.dto';
import { UpdateOrderDto } from '@/core/models/app/order/update-order.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { ORDER_SERVICE, OrderService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('owner/orders')
@Controller('owner/orders')
@Serialize(OrderDto)
export class OwnerOrderController {
  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService) { }

  @Post()
  async createOrder(@Body() body: CreateOrderDto, @Request() req): Promise<string> {
    return await this.orderService.create({ ...body, userId: req.user.userId })
  }

  // @Post("checkout")
  // async checkoutOrder(@Body() body: CheckoutOrderDto, @Request() req): Promise<string> {
  //   return await this.orderService.checkout({ ...body, userId: req.user.userId })
  // }

  @ApiOkResponsePaginated(OrderDto)
  @Get()
  async findAll(@Query() query: OrderQueryDto): Promise<PaginatedResponseDto<OrderDto>> {
    const paginatedData = await this.orderService.findAll(query)

    return PaginatedResponseDto.from<OrderDto>(paginatedData)
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() payload: UpdateOrderDto): Promise<SingleResponseDto<OrderDto>> {
    const data = await this.orderService.update({ id, ...payload })

    return SingleResponseDto.from<OrderDto>({ data })
  }

  @ApiResponse({ type: SingleResponseDto<OrderDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<OrderDto>> {
    const data = await this.orderService.findOne(id)

    return SingleResponseDto.from<OrderDto>({ data })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.orderService.delete(id)
  }
}
