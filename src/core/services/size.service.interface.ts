import { SizeQueryDto, CreateSizeDto, PaginatedDataDto, UpdateSizeDto } from "@/core/models";
import { Size } from "../entities";
export interface SizeService {

  create(payload: CreateSizeDto): Promise<string>;

  findOne(id: string): Promise<Size>;

  findAll(query: SizeQueryDto): Promise<PaginatedDataDto<Size>>;

  update(payload: UpdateSizeDto): Promise<Size>;

  delete(id: string): Promise<void>;
}

export const SIZE_SERVICE = 'SizeService';
