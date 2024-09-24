import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { ColorDto, ColorQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateColorDto } from '@/core/models/app/color/create-color.dto';
import { UpdateColorDto } from '@/core/models/app/color/update-color.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { COLOR_SERVICE, ColorService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('owner/colors')
@Controller('owner/colors')
@Serialize(ColorDto)
export class OwnerColorController {
  constructor(@Inject(COLOR_SERVICE) private colorService: ColorService) { }

  @Post()
  async createColor(@Body() body: CreateColorDto): Promise<string> {
    return await this.colorService.create(body)
  }

  @ApiOkResponsePaginated(ColorDto)
  @Get()
  async findAll(@Query() query: ColorQueryDto): Promise<PaginatedResponseDto<ColorDto>> {
    const paginatedData = await this.colorService.findAll(query)

    return PaginatedResponseDto.from<ColorDto>(paginatedData)
  }

  @Patch(':id')
  async updateColor(@Param('id') id: string, @Body() payload: UpdateColorDto): Promise<SingleResponseDto<ColorDto>> {
    const data = await this.colorService.update({ id, ...payload })

    return SingleResponseDto.from<ColorDto>({ data })
  }

  @ApiResponse({ type: SingleResponseDto<ColorDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<ColorDto>> {
    const data = await this.colorService.findOne(id)

    return SingleResponseDto.from<ColorDto>({ data })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.colorService.delete(id)
  }
}
