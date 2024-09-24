import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { SizeDto, SizeQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateSizeDto } from '@/core/models/app/size/create-size.dto';
import { UpdateSizeDto } from '@/core/models/app/size/update-size.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { SIZE_SERVICE, SizeService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sizes')
@Controller('sizes')
@Serialize(SizeDto)
export class SizeController {
  constructor(@Inject(SIZE_SERVICE) private sizeService: SizeService) { }

  @ApiOkResponsePaginated(SizeDto)
  @Get()
  async findAll(@Query() query: SizeQueryDto): Promise<PaginatedResponseDto<SizeDto>> {
    const paginatedData = await this.sizeService.findAll(query)

    return PaginatedResponseDto.from<SizeDto>(paginatedData)
  }

  @ApiResponse({ type: SingleResponseDto<SizeDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<SizeDto>> {
    const data = await this.sizeService.findOne(id)

    return SingleResponseDto.from<SizeDto>({ data })
  }
}
