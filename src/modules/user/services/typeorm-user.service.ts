import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto } from '@/core/models';
import { UserService } from '@/core/services/user.service.interface';
import { User } from '@/core/entities';
import { CreateUserDto } from '@/core/models/app/user/create-user.dto';
import { PaginatedDataDto } from '@/core/models/general/pagination-data.dto';
import { customHttpResponse } from '@/core/response/custom-response.service';
import { UserQueryDto } from '@/core/models/app/user/query-user.dto';
import { UpdateUserDto } from '@/core/models/app/user/update-user.dto';

@Injectable()
export class TypeormUserService implements UserService {
  constructor(private dataSource: DataSource, @InjectRepository(User) private repo: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.dataSource.transaction(async (em) => {
      const user = em.create(User, { ...createUserDto })
      console.log(user)

      const data = await em.save(user)

      return data
    })
  }

  async findOne(username: string) {
    const user = await this.repo.findOne({ where: { username } })

    if (!user) {
      return undefined
    }

    return user
  }

  async findAll(query: UserQueryDto): Promise<PaginatedDataDto<User>> {
    const { limit, offset } = QueryDto.getPageable(query);

    // const list = await this.repo.find({ where: { user_name: query.term }, relations: ['rooms'], skip: offset, take: limit })

    const [list, count] = await this.dataSource.getRepository(User)
      .createQueryBuilder('user')
      .where(query.term ? 'user.user_name = :term' : '1=1', { term: query.term })
      .skip(offset).take(limit).getManyAndCount()

    return new PaginatedDataDto({
      list: list,
      count: count,
      offset: offset,
      limit: limit,
    })
  }

  async update(payload: UpdateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...attrs } = payload

    const user = await this.findOne(attrs.username)

    if (!user) {
      throw customHttpResponse.NotFoundException({ message: 'User not found!' })
    }

    Object.assign(user, attrs)

    await this.repo.save(user)

    return user
  }

  async delete(id: string) {
    const user = await this.repo.findOne({ where: { id } })

    await this.repo.remove(user)
  }
}
