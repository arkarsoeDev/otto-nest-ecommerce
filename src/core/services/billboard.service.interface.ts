import { BillboardQueryDto, CreateBillboardDto, PaginatedDataDto, UpdateBillboardDto } from "@/core/models";
import { Billboard } from "../entities";
export interface BillboardService {

  create(payload: CreateBillboardDto): Promise<string>;

  findOne(id: string): Promise<Billboard>;

  findAll(query: BillboardQueryDto): Promise<PaginatedDataDto<Billboard>>;

  update(payload: UpdateBillboardDto): Promise<Billboard>;

  delete(id: string): Promise<void>;
}

export const BILLBOARD_SERVICE = 'BillboardService';
