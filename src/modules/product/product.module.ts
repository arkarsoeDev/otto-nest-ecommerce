import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { TypeormProductService } from './services/typeorm-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/core/entities';
import { PRODUCT_SERVICE } from '@/core/services';
import { ImageModule } from '../image/image.module';
import { OwnerProductController } from './controllers/owner-product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ImageModule
  ],
  controllers: [ProductController, OwnerProductController],
  providers: [
    {
      provide: PRODUCT_SERVICE,
      useClass: TypeormProductService
    }
  ]
})
export class ProductModule { }
