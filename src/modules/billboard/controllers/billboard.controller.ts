import { ApiOkResponsePaginated } from '@/common/decorators';
import { Public } from '@/common/decorators/is-public.decorator';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { BillboardDto, BillboardQueryDto, PaginatedResponseDto } from '@/core/models';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { BILLBOARD_SERVICE, BillboardService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('billboards')
@Controller('billboards')
@Public()
@Serialize(BillboardDto)
export class BillboardController {
  constructor(@Inject(BILLBOARD_SERVICE) private billboardService: BillboardService) { }

  @ApiOkResponsePaginated(BillboardDto)
  @Get()
  async findAll(@Query() query: BillboardQueryDto): Promise<PaginatedResponseDto<BillboardDto>> {
    const paginatedData = await this.billboardService.findAll(query)

    return PaginatedResponseDto.from<BillboardDto>(paginatedData)
  }

  @ApiResponse({ type: SingleResponseDto<BillboardDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<BillboardDto>> {
    const data = await this.billboardService.findOne(id)

    return SingleResponseDto.from<BillboardDto>({ data })
  }
}
