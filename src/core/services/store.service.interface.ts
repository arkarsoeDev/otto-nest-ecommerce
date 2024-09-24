import { StoreQueryDto, CreateStoreDto, PaginatedDataDto, UpdateStoreDto } from "@/core/models";
import { Store } from "../entities";
export interface StoreService {

  create(payload: CreateStoreDto): Promise<string>;

  findOne(id: string): Promise<Store>;

  findAll(query: StoreQueryDto): Promise<PaginatedDataDto<Store>>;

  update(payload: UpdateStoreDto): Promise<Store>;

  delete(id: string): Promise<void>;
}

export const STORE_SERVICE = 'StoreService';
