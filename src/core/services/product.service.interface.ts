import { ProductQueryDto, CreateProductDto, PaginatedDataDto, UpdateProductDto } from "@/core/models";
import { Product } from "../entities";
export interface ProductService {

  create(payload: CreateProductDto): Promise<string>;

  findOne(id: string): Promise<Product>;

  findAll(query: ProductQueryDto): Promise<PaginatedDataDto<Product>>;

  update(payload: UpdateProductDto): Promise<Product>;

  delete(id: string): Promise<void>;
}

export const PRODUCT_SERVICE = 'ProductService';
