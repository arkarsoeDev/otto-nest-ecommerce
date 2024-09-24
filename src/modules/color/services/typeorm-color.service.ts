import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorQueryDto, QueryDto } from '@/core/models';
import { ColorService } from '@/core/services/color.service.interface';
import { Color } from '@/core/entities';
import { CreateColorDto } from '@/core/models/app/color/create-color.dto';
import { UpdateColorDto } from '@/core/models/app/color/update-color.dto';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';

@Injectable()
export class TypeormColorService implements ColorService {
  constructor(private dataSource: DataSource, @InjectRepository(Color) private repo: Repository<Color>) { }

  async create(createColorDto: CreateColorDto) {

    return this.dataSource.transaction(async (em) => {
      const color = em.create(Color, { ...createColorDto })

      const data = await em.save(color)

      return data.id
    })
  }

  async findOne(id: string) {
    const color = await this.repo.findOne({ where: { id } })

    if (!color) {
      throw customHttpResponse.NotFoundException({ message: 'Color not found!' })
    }

    return color
  }

  async findAll(query: ColorQueryDto): Promise<PaginatedDataDto<Color>> {
    const { limit, offset } = QueryDto.getPageable(query);

    const list = await this.repo.find({ where: { name: query.term, storeId: query.storeId }, relations: ['store'], skip: offset, take: limit })

    const count = await this.repo.count({ where: { name: query.term, storeId: query.storeId } })

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }

  async update(payload: UpdateColorDto) {
    const { id, ...attrs } = payload

    const color = await this.findOne(id)

    if (!color) {
      throw customHttpResponse.NotFoundException({ message: 'Color not found!' })
    }

    Object.assign(color, attrs)

    await this.repo.save(color)

    return color
  }

  async delete(id: string) {
    const color = await this.findOne(id)

    await this.repo.remove(color)
  }
}
