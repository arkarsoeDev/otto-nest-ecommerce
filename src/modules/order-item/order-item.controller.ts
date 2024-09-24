import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { OrderItemDto, OrderItemQueryDto, PaginatedResponseDto } from '@/core/models';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { ORDER_ITEM_SERVICE, OrderItemService } from '@/core/services';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order-items')
@Controller('order-items')
@Serialize(OrderItemDto)
export class OrderItemController {
  constructor(@Inject(ORDER_ITEM_SERVICE) private orderItemService: OrderItemService) { }

  @ApiOkResponsePaginated(OrderItemDto)
  @Get()
  async findAll(@Query() query: OrderItemQueryDto): Promise<PaginatedResponseDto<OrderItemDto>> {
    const paginatedData = await this.orderItemService.findAll(query)

    return PaginatedResponseDto.from<OrderItemDto>(paginatedData)
  }

  @ApiResponse({ type: SingleResponseDto<OrderItemDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<OrderItemDto>> {
    const data = await this.orderItemService.findOne(id)

    return SingleResponseDto.from<OrderItemDto>({ data })
  }
}
