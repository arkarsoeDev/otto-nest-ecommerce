import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { OrderDto, OrderQueryDto, PaginatedResponseDto } from '@/core/models';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { ORDER_SERVICE, OrderService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
@Serialize(OrderDto)
export class OrderController {
  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService) { }

  @ApiOkResponsePaginated(OrderDto)
  @Get()
  async findAll(@Query() query: OrderQueryDto): Promise<PaginatedResponseDto<OrderDto>> {
    const paginatedData = await this.orderService.findAll(query)

    return PaginatedResponseDto.from<OrderDto>(paginatedData)
  }

  @ApiResponse({ type: SingleResponseDto<OrderDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<OrderDto>> {
    const data = await this.orderService.findOne(id)

    return SingleResponseDto.from<OrderDto>({ data })
  }
}
