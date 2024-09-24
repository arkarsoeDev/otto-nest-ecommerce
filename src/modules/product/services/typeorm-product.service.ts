import { Inject, Injectable } from '@nestjs/common';
import { Any, DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductQueryDto, QueryDto } from '@/core/models';
import { ProductService } from '@/core/services/product.service.interface';
import { Product } from '@/core/entities';
import { CreateProductDto } from '@/core/models/app/product/create-product.dto';
import { UpdateProductDto } from '@/core/models/app/product/update-product.dto';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';
import { IMAGE_SERVICE, ImageService } from '@/core/services';

@Injectable()
export class TypeormProductService implements ProductService {
  constructor(private dataSource: DataSource, @InjectRepository(Product) private repo: Repository<Product>, @Inject(IMAGE_SERVICE) private imageService: ImageService) { }

  async create(createProductDto: CreateProductDto) {

    return this.dataSource.transaction(async (em) => {

      const product = em.create(Product, { ...createProductDto })

      const data = await em.save(product)

      const imagesWithProductId = createProductDto.images.map(image => ({ ...image, productId: data.id }))
      console.log(imagesWithProductId, 'image with product')
      await this.imageService.createMany({ data: imagesWithProductId }, em)

      return data.id
    })
  }

  async findOne(id: string) {
    const product = await this.repo.findOne({ where: { id }, relations: ['store', 'category', 'size', 'color', 'images'] })

    if (!product) {
      throw customHttpResponse.NotFoundException({ message: 'Product not found!' })
    }

    return product
  }

  async findAll(query: ProductQueryDto): Promise<PaginatedDataDto<Product>> {
    const { limit, offset } = QueryDto.getPageable(query);
    const { term, ...rest } = query

    console.log(query, 'this is the query')

    const conditions: any = { ...rest };
    if (term) {
      conditions.name = term
    }


    const list = await this.repo.find({ where: conditions, relations: ['store', 'category', 'size', 'color', 'images'], skip: offset, take: limit })

    const count = await this.repo.count({ where: conditions })

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }

  async update(payload: UpdateProductDto) {
    const { id, images, ...attrs } = payload
    const product = await this.repo.findOne({ where: { id } })


    if (!product) {
      throw customHttpResponse.NotFoundException({ message: 'Product not found!' })
    }

    console.log(images)

    if (images) {
      await this.imageService.deleteByProductId(product.id)

      const imagesWithProductId = images.map(image => ({ ...image, productId: product.id }))
      await this.imageService.createMany({ data: imagesWithProductId })
    }

    Object.assign(product, { ...attrs })

    await this.repo.save(product)

    return product
  }

  async delete(id: string) {
    const product = await this.findOne(id)

    await this.repo.remove(product)
  }
}
