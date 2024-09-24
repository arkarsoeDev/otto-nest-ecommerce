import { ApiOkResponsePaginated } from '@/common/decorators';
import { Public } from '@/common/decorators/is-public.decorator';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { CategoryDto, CategoryQueryDto, PaginatedResponseDto } from '@/core/models';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { CATEGORY_SERVICE, CategoryService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
@Public()
@Serialize(CategoryDto)
export class CategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private categoryService: CategoryService) { }

  @ApiOkResponsePaginated(CategoryDto)
  @Get()
  async findAll(@Query() query: CategoryQueryDto): Promise<PaginatedResponseDto<CategoryDto>> {
    const paginatedData = await this.categoryService.findAll(query)

    return PaginatedResponseDto.from<CategoryDto>(paginatedData)
  }

  @ApiResponse({ type: SingleResponseDto<CategoryDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<CategoryDto>> {
    const data = await this.categoryService.findOne(id)

    return SingleResponseDto.from<CategoryDto>({ data })
  }
}
