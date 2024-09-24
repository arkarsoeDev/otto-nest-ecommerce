import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { TypeormCategoryService } from './services/typeorm-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@/core/entities';
import { CATEGORY_SERVICE } from '@/core/services';
import { OwnerCategoryController } from './controllers/owner-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController, OwnerCategoryController],
  providers: [
    {
      provide: CATEGORY_SERVICE,
      useClass: TypeormCategoryService
    }
  ]
})
export class CategoryModule { }
