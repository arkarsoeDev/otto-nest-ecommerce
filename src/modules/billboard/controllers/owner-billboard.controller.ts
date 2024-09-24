import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { BillboardDto, BillboardQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateBillboardDto } from '@/core/models/app/billboard/create-billboard.dto';
import { UpdateBillboardDto } from '@/core/models/app/billboard/update-billboard.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { BILLBOARD_SERVICE, BillboardService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('owner/billboards')
@Controller('owner/billboards')
@Serialize(BillboardDto)
export class OwnerBillboardController {
  constructor(@Inject(BILLBOARD_SERVICE) private billboardService: BillboardService) { }

  @Post()
  async createBillboard(@Body() body: CreateBillboardDto): Promise<string> {
    return await this.billboardService.create(body)
  }

  @ApiOkResponsePaginated(BillboardDto)
  @Get()
  async findAll(@Query() query: BillboardQueryDto): Promise<PaginatedResponseDto<BillboardDto>> {
    const paginatedData = await this.billboardService.findAll(query)

    return PaginatedResponseDto.from<BillboardDto>(paginatedData)
  }

  @Patch(':id')
  async updateBillboard(@Param('id') id: string, @Body() payload: UpdateBillboardDto): Promise<SingleResponseDto<BillboardDto>> {
    const data = await this.billboardService.update({ id, ...payload })

    return SingleResponseDto.from<BillboardDto>({ data })
  }

  @ApiResponse({ type: SingleResponseDto<BillboardDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<BillboardDto>> {
    const data = await this.billboardService.findOne(id)

    return SingleResponseDto.from<BillboardDto>({ data })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

    return await this.billboardService.delete(id)
  }
}
