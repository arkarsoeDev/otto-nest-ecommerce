import { ApiOkResponsePaginated, ApiOkResponseSingle } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { Store } from '@/core/entities';
import { StoreDto, StoreQueryDto, PaginatedResponseDto, CreateStoreDto, UpdateStoreDto } from '@/core/models';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { STORE_SERVICE, StoreService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Req, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('owner/stores')
@Controller('owner/stores')
@Serialize(StoreDto)
export class OwnerStoreController {
  constructor(@Inject(STORE_SERVICE) private storeService: StoreService) { }

  @Post()
  async createStore(@Body() body: CreateStoreDto, @Req() req): Promise<{ id: string }> {
    const id = await this.storeService.create({ ...body, userId: req.user.userId })

    return {
      id
    }
  }

  @ApiOkResponsePaginated(StoreDto)
  @Get()
  async findAll(@Query() query: StoreQueryDto, @Req() req): Promise<PaginatedResponseDto<StoreDto>> {
    const paginatedData = await this.storeService.findAll({ ...query, userId: req.user.userId })

    return PaginatedResponseDto.from<Store>(paginatedData)
  }

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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.storeService.delete(id)
  }
}
