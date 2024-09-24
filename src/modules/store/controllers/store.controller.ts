import { ApiOkResponsePaginated, ApiOkResponseSingle } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { Store } from '@/core/entities';
import { StoreDto, StoreQueryDto, PaginatedResponseDto, CreateStoreDto, UpdateStoreDto } from '@/core/models';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { STORE_SERVICE, StoreService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stores')
@Controller('stores')
@Serialize(StoreDto)
export class StoreController {
  constructor(@Inject(STORE_SERVICE) private storeService: StoreService) { }

  @Patch(':id')
  async updateStore(@Param('id') id: string, @Body() payload: UpdateStoreDto): Promise<SingleResponseDto<StoreDto>> {
    const data = await this.storeService.update({ id, ...payload })

    return SingleResponseDto.from<Store>({ data })
  }

  @ApiOkResponseSingle(StoreDto)
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<StoreDto>> {
    const data = await this.storeService.findOne(id)

    return SingleResponseDto.from<Store>({ data })
  }
}
