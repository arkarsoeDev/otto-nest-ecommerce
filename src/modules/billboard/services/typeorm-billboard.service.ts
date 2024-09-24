import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BillboardQueryDto, QueryDto } from '@/core/models';
import { BillboardService } from '@/core/services/billboard.service.interface';
import { Billboard } from '@/core/entities';
import { CreateBillboardDto } from '@/core/models/app/billboard/create-billboard.dto';
import { UpdateBillboardDto } from '@/core/models/app/billboard/update-billboard.dto';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';

@Injectable()
export class TypeormBillboardService implements BillboardService {
  constructor(private dataSource: DataSource, @InjectRepository(Billboard) private repo: Repository<Billboard>) { }

  async create(createBillboardDto: CreateBillboardDto) {

    return this.dataSource.transaction(async (em) => {
      const billboard = em.create(Billboard, { ...createBillboardDto })

      const data = await em.save(billboard)

      return data.id
    })
  }

  async findOne(id: string) {
    const billboard = await this.repo.findOne({ where: { id } })

    if (!billboard) {
      throw customHttpResponse.NotFoundException({ message: 'Billboard not found!' })
    }

    return billboard
  }

  async findAll(query: BillboardQueryDto): Promise<PaginatedDataDto<Billboard>> {
    const { limit, offset } = QueryDto.getPageable(query);

    const list = await this.repo.find({ where: { label: query.term, storeId: query.storeId }, relations: ['store'], skip: offset, take: limit })

    const count = await this.repo.count({ where: { label: query.term, storeId: query.storeId } })

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }

  async update(payload: UpdateBillboardDto) {
    const { id, ...attrs } = payload

    const billboard = await this.findOne(id)

    if (!billboard) {
      throw customHttpResponse.NotFoundException({ message: 'Billboard not found!' })
    }

    Object.assign(billboard, attrs)

    await this.repo.save(billboard)

    return billboard
  }

  async delete(id: string) {
    const billboard = await this.findOne(id)
    console.log(billboard)
    await this.repo.remove(billboard)
  }
}
