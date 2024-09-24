import { CategoryQueryDto, CreateCategoryDto, PaginatedDataDto, UpdateCategoryDto } from "@/core/models";
import { Category } from "../entities";
export interface CategoryService {

  create(payload: CreateCategoryDto): Promise<string>;

  findOne(id: string): Promise<Category>;

  findAll(query: CategoryQueryDto): Promise<PaginatedDataDto<Category>>;

  update(payload: UpdateCategoryDto): Promise<Category>;

  delete(id: string): Promise<void>;
}

export const CATEGORY_SERVICE = 'CategoryService';
