import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryQueryDto, QueryDto } from '@/core/models';
import { CategoryService } from '@/core/services/category.service.interface';
import { Category } from '@/core/entities';
import { CreateCategoryDto } from '@/core/models/app/category/create-category.dto';
import { UpdateCategoryDto } from '@/core/models/app/category/update-category.dto';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';

@Injectable()
export class TypeormCategoryService implements CategoryService {
  constructor(private dataSource: DataSource, @InjectRepository(Category) private repo: Repository<Category>) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<string> {

    return this.dataSource.transaction(async (em) => {
      const category = em.create(Category, { ...createCategoryDto })

      const data = await em.save(category)

      return data.id
    })
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.repo.findOne({ where: { id }, relations: ['store', 'billboard'] })

    if (!category) {
      throw customHttpResponse.NotFoundException({ message: 'Category not found!' })
    }

    return category
  }

  async findAll(query: CategoryQueryDto): Promise<PaginatedDataDto<Category>> {
    const { limit, offset } = QueryDto.getPageable(query);

    const list = await this.repo.find({ where: { name: query.term, storeId: query.storeId }, relations: ['store', 'billboard'], skip: offset, take: limit })

    const count = await this.repo.count({ where: { name: query.term, storeId: query.storeId } })

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }

  async update(payload: UpdateCategoryDto): Promise<Category> {
    const { id, ...attrs } = payload

    const category = await this.findOne(id)

    if (!category) {
      throw customHttpResponse.NotFoundException({ message: 'Category not found!' })
    }

    Object.assign(category, attrs)

    await this.repo.save(category)

    return category
  }

  async delete(id: string): Promise<void> {
    const category = await this.findOne(id)

    await this.repo.remove(category)
  }
}
