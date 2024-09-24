import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { SizeDto, SizeQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateSizeDto } from '@/core/models/app/size/create-size.dto';
import { UpdateSizeDto } from '@/core/models/app/size/update-size.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { SIZE_SERVICE, SizeService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('owner/sizes')
@Controller('owner/sizes')
@Serialize(SizeDto)
export class OwnerSizeController {
  constructor(@Inject(SIZE_SERVICE) private sizeService: SizeService) { }

  @Post()
  async createSize(@Body() body: CreateSizeDto): Promise<string> {
    return await this.sizeService.create(body)
  }

  @ApiOkResponsePaginated(SizeDto)
  @Get()
  async findAll(@Query() query: SizeQueryDto): Promise<PaginatedResponseDto<SizeDto>> {
    console.log(query)
    const paginatedData = await this.sizeService.findAll(query)

    return PaginatedResponseDto.from<SizeDto>(paginatedData)
  }

  @Patch(':id')
  async updateSize(@Param('id') id: string, @Body() payload: UpdateSizeDto): Promise<SingleResponseDto<SizeDto>> {
    const data = await this.sizeService.update({ id, ...payload })

    return SingleResponseDto.from<SizeDto>({ data })
  }

  @ApiResponse({ type: SingleResponseDto<SizeDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<SizeDto>> {
    const data = await this.sizeService.findOne(id)

    return SingleResponseDto.from<SizeDto>({ data })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.sizeService.delete(id)
  }
}
