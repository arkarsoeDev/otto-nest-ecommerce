import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { ProductDto, ProductQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateProductDto } from '@/core/models/app/product/create-product.dto';
import { UpdateProductDto } from '@/core/models/app/product/update-product.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { PRODUCT_SERVICE, ProductService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('owner/products')
@Controller('owner/products')
@Serialize(ProductDto)
export class OwnerProductController {
  constructor(@Inject(PRODUCT_SERVICE) private productService: ProductService) { }

  @Post()
  async createProduct(@Body() body: CreateProductDto): Promise<string> {
    console.log(body)
    return await this.productService.create(body)
  }

  @ApiOkResponsePaginated(ProductDto)
  @Get()
  async findAll(@Query() query: ProductQueryDto): Promise<PaginatedResponseDto<ProductDto>> {
    const paginatedData = await this.productService.findAll(query)

    return PaginatedResponseDto.from<ProductDto>(paginatedData)
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() payload: UpdateProductDto): Promise<SingleResponseDto<ProductDto>> {
    const data = await this.productService.update({ id, ...payload })

    return SingleResponseDto.from<ProductDto>({ data })
  }

  @ApiResponse({ type: SingleResponseDto<ProductDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<ProductDto>> {
    const data = await this.productService.findOne(id)

    return SingleResponseDto.from<ProductDto>({ data })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id)
  }
}
