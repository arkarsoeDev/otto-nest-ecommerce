import { ImageQueryDto, CreateImageDto, PaginatedDataDto, UpdateImageDto, CreateManyImageDto } from "@/core/models";
import { Image } from "../entities";
import { EntityManager } from "typeorm";
export interface ImageService {

  create(payload: CreateImageDto): Promise<string>;

  createMany(payload: CreateManyImageDto, emSrc?: EntityManager): Promise<Image[]>;

  findOne(id: string): Promise<Image>;

  findAll(query: ImageQueryDto): Promise<PaginatedDataDto<Image>>;

  update(payload: UpdateImageDto): Promise<Image>;

  delete(id: string): Promise<void>;

  deleteByProductId(productId: string, emSrc?: EntityManager): Promise<void>;
}

export const IMAGE_SERVICE = 'ImageService';
