import { ApiOkResponsePaginated } from '@/common/decorators';
import { Serialize } from '@/common/interceptors/serialize.interceptor';
import { UserQueryDto, PaginatedResponseDto, PublicUserDto } from '@/core/models';
import { UpdateUserDto } from '@/core/models/app/user/update-user.dto';
import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { USER_SERVICE, UserService } from '@/core/services/user.service.interface';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@Serialize(PublicUserDto)
export class UserController {
  constructor(@Inject(USER_SERVICE) private userService: UserService) { }

  @ApiOkResponsePaginated(PublicUserDto)
  @Get()
  async findAll(@Query() query: UserQueryDto): Promise<PaginatedResponseDto<PublicUserDto>> {
    console.log(query)

    const paginatedData = await this.userService.findAll(query)

    return PaginatedResponseDto.from<PublicUserDto>(paginatedData)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto): Promise<SingleResponseDto<PublicUserDto>> {
    const data = await this.userService.update({ id, ...payload })

    return SingleResponseDto.from<PublicUserDto>({ data })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id)
  }
}
