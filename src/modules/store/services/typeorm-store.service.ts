import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreQueryDto, QueryDto } from '@/core/models';
import { StoreService } from '@/core/services/store.service.interface';
import { Store } from '@/core/entities';
import { CreateStoreDto } from '@/core/models/app/store/create-store.dto';
import { UpdateStoreDto } from '@/core/models/app/store/update-store.dto';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';

@Injectable()
export class TypeormStoreService implements StoreService {
  constructor(private dataSource: DataSource, @InjectRepository(Store) private repo: Repository<Store>) { }

  async create(createStoreDto: CreateStoreDto) {

    return this.dataSource.transaction(async (em) => {
      const store = em.create(Store, { ...createStoreDto })

      const data = await em.save(store)

      return data.id
    })
  }

  async findOne(id: string) {
    const store = await this.repo.findOne({ where: { id } })

    if (!store) {
      throw customHttpResponse.NotFoundException({ message: 'Store not found!' })
    }

    return store
  }

  async findAll(query: StoreQueryDto): Promise<PaginatedDataDto<Store>> {
    const { limit, offset } = QueryDto.getPageable(query);

    const list = await this.repo.find({ where: { name: query.term, userId: query.userId }, skip: offset, take: limit })

    const count = await this.repo.count({ where: { name: query.term, userId: query.userId } })

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }

  async update(payload: UpdateStoreDto) {
    const { id, ...attrs } = payload

    const store = await this.findOne(id)

    if (!store) {
      throw customHttpResponse.NotFoundException({ message: 'Store not found!' })
    }

    Object.assign(store, attrs)

    await this.repo.save(store)

    return store
  }

  async delete(id: string) {
    const store = await this.findOne(id)

    await this.repo.remove(store)
  }
}
