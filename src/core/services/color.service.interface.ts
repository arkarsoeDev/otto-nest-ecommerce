import { ColorQueryDto, CreateColorDto, PaginatedDataDto, UpdateColorDto } from "@/core/models";
import { Color } from "../entities";
export interface ColorService {

  create(payload: CreateColorDto): Promise<string>;

  findOne(id: string): Promise<Color>;

  findAll(query: ColorQueryDto): Promise<PaginatedDataDto<Color>>;

  update(payload: UpdateColorDto): Promise<Color>;

  delete(id: string): Promise<void>;
}

export const COLOR_SERVICE = 'ColorService';
