import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { ImageDto, ImageQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateImageDto } from '@/core/models/app/image/create-image.dto';
import { UpdateImageDto } from '@/core/models/app/image/update-image.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { IMAGE_SERVICE, ImageService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
@Serialize(ImageDto)
export class ImageController {
  constructor(@Inject(IMAGE_SERVICE) private imageService: ImageService) { }

  @Post()
  async createImage(@Body() body: CreateImageDto): Promise<string> {
    return await this.imageService.create(body)
  }

  @ApiOkResponsePaginated(ImageDto)
  @Get()
  async findAll(@Query() query: ImageQueryDto): Promise<PaginatedResponseDto<ImageDto>> {
    const paginatedData = await this.imageService.findAll(query)

    return PaginatedResponseDto.from<ImageDto>(paginatedData)
  }

  @Patch(':id')
  async updateImage(@Param('id') id: string, @Body() payload: UpdateImageDto): Promise<SingleResponseDto<ImageDto>> {
    const data = await this.imageService.update({ id, ...payload })

    return SingleResponseDto.from<ImageDto>({ data })
  }

  @ApiResponse({ type: SingleResponseDto<ImageDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<ImageDto>> {
    const data = await this.imageService.findOne(id)

    return SingleResponseDto.from<ImageDto>({ data })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.imageService.delete(id)
  }
}
