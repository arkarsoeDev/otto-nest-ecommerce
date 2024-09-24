import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SizeQueryDto, QueryDto } from '@/core/models';
import { SizeService } from '@/core/services/size.service.interface';
import { Size } from '@/core/entities';
import { CreateSizeDto } from '@/core/models/app/size/create-size.dto';
import { UpdateSizeDto } from '@/core/models/app/size/update-size.dto';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';

@Injectable()
export class TypeormSizeService implements SizeService {
  constructor(private dataSource: DataSource, @InjectRepository(Size) private repo: Repository<Size>) { }

  async create(createSizeDto: CreateSizeDto) {

    return this.dataSource.transaction(async (em) => {
      const size = em.create(Size, { ...createSizeDto })

      const data = await em.save(size)

      return data.id
    })
  }

  async findOne(id: string) {
    const size = await this.repo.findOne({ where: { id } })

    if (!size) {
      throw customHttpResponse.NotFoundException({ message: 'Size not found!' })
    }

    return size
  }

  async findAll(query: SizeQueryDto): Promise<PaginatedDataDto<Size>> {
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

  async update(payload: UpdateSizeDto) {
    const { id, ...attrs } = payload

    const size = await this.findOne(id)

    if (!size) {
      throw customHttpResponse.NotFoundException({ message: 'Size not found!' })
    }

    Object.assign(size, attrs)

    await this.repo.save(size)

    return size
  }

  async delete(id: string) {
    const size = await this.findOne(id)

    await this.repo.remove(size)
  }
}
