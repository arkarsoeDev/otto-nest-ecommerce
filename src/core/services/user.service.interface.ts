import { CreateUserDto, PaginatedDataDto, UserQueryDto, UpdateUserDto } from "@/core/models";
import { User } from "../entities";

export interface UserService {

  findOne(username: string): Promise<User | undefined>;

  create(payload: CreateUserDto): Promise<User>;

  findAll(query: UserQueryDto): Promise<PaginatedDataDto<User>>;

  update(payload: UpdateUserDto): Promise<User>;

  delete(id: string): Promise<void>;
}

export const USER_SERVICE = 'UserService';
