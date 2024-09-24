import { Module } from '@nestjs/common';
import { SizeController } from './controllers/size.controller';
import { TypeormSizeService } from './services/typeorm-size.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from '@/core/entities';
import { SIZE_SERVICE } from '@/core/services';
import { OwnerSizeController } from './controllers/owner-size.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [SizeController, OwnerSizeController],
  providers: [
    {
      provide: SIZE_SERVICE,
      useClass: TypeormSizeService
    }
  ]
})
export class SizeModule { }
