import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { TypeormImageService } from './services/typeorm-image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '@/core/entities';
import { IMAGE_SERVICE } from '@/core/services';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [
    {
      provide: IMAGE_SERVICE,
      useClass: TypeormImageService
    }
  ],
  exports: [
    {
      provide: IMAGE_SERVICE,
      useClass: TypeormImageService
    }
  ]
})
export class ImageModule { }
