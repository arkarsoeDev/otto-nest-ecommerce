import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { CategoryDto, CategoryQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateCategoryDto } from '@/core/models/app/category/create-category.dto';
import { UpdateCategoryDto } from '@/core/models/app/category/update-category.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { CATEGORY_SERVICE, CategoryService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('owner/categories')
@Controller('owner/categories')
@Serialize(CategoryDto)
export class OwnerCategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private categoryService: CategoryService) { }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto): Promise<string> {
    return await this.categoryService.create(body)
  }

  @ApiOkResponsePaginated(CategoryDto)
  @Get()
  async findAll(@Query() query: CategoryQueryDto): Promise<PaginatedResponseDto<CategoryDto>> {
    const paginatedData = await this.categoryService.findAll(query)

    return PaginatedResponseDto.from<CategoryDto>(paginatedData)
  }

  @Patch(':id')
  async updateCategory(@Param('id') id: string, @Body() payload: UpdateCategoryDto): Promise<SingleResponseDto<CategoryDto>> {
    const data = await this.categoryService.update({ id, ...payload })

    return SingleResponseDto.from<CategoryDto>({ data })
  }

  @ApiResponse({ type: SingleResponseDto<CategoryDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<CategoryDto>> {
    const data = await this.categoryService.findOne(id)

    return SingleResponseDto.from<CategoryDto>({ data })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id)
  }
}
