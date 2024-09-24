import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto, CreateManyImageDto, ImageQueryDto, QueryDto, UpdateImageDto } from '@/core/models';
import { ImageService } from '@/core/services/image.service.interface';
import { Image } from '@/core/entities';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';

@Injectable()
export class TypeormImageService implements ImageService {
  constructor(private dataSource: DataSource, @InjectRepository(Image) private repo: Repository<Image>) { }

  async create(createImageDto: CreateImageDto) {

    return this.dataSource.transaction(async (em) => {
      const image = em.create(Image, { ...createImageDto })

      const data = await em.save(image)

      return data.id
    })
  }

  async createMany(createManyImageDto: CreateManyImageDto, emSrc: EntityManager) {
    if (emSrc) {
      const images = emSrc.create(Image, createManyImageDto.data)

      const data = await emSrc.save(images)

      return data
    } else {
      return this.dataSource.transaction(async (em) => {
        const images = em.create(Image, createManyImageDto.data)

        const data = await em.save(images)

        return data
      })
    }
  }


  async findOne(id: string) {
    const image = await this.repo.findOne({ where: { id } })

    if (!image) {
      throw customHttpResponse.NotFoundException({ message: 'Image not found!' })
    }

    return image
  }

  async findAll(query: ImageQueryDto): Promise<PaginatedDataDto<Image>> {
    const { limit, offset } = QueryDto.getPageable(query);

    const list = await this.repo.find({ where: { url: query.term }, relations: ['product'], skip: offset, take: limit })

    const count = await this.repo.count({ where: { url: query.term } })

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }

  async update(payload: UpdateImageDto) {
    const { id, ...attrs } = payload

    const image = await this.findOne(id)

    if (!image) {
      throw customHttpResponse.NotFoundException({ message: 'Image not found!' })
    }

    Object.assign(image, attrs)

    await this.repo.save(image)

    return image
  }

  async delete(id: string) {
    const image = await this.findOne(id)

    await this.repo.remove(image)
  }

  async deleteByProductId(productId: string, emSrc: EntityManager) {
    const images = await this.repo.find({ where: { productId } })

    if (emSrc) {
      await emSrc.remove(images)
    } else {
      await this.repo.remove(images)
    }
  }
}
