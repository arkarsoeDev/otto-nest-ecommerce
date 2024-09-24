import { ApiOkResponsePaginated } from '@/common/decorators';
import { Public } from '@/common/decorators/is-public.decorator';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { ProductDto, ProductQueryDto, PaginatedResponseDto } from '@/core/models';
import { CreateProductDto } from '@/core/models/app/product/create-product.dto';
import { UpdateProductDto } from '@/core/models/app/product/update-product.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { PRODUCT_SERVICE, ProductService } from '@/core/services';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
@Public()
@Serialize(ProductDto)
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private productService: ProductService) { }

  @ApiOkResponsePaginated(ProductDto)
  @Get()
  async findAll(@Query() query: ProductQueryDto): Promise<PaginatedResponseDto<ProductDto>> {
    const paginatedData = await this.productService.findAll(query)

    return PaginatedResponseDto.from<ProductDto>(paginatedData)
  }

  @ApiResponse({ type: SingleResponseDto<ProductDto> })
  @Get(':id')
  async find(@Param('id') id: string): Promise<SingleResponseDto<ProductDto>> {
    const data = await this.productService.findOne(id)

    return SingleResponseDto.from<ProductDto>({ data })
  }
}
