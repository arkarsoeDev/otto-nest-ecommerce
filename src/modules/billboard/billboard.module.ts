import { Module } from '@nestjs/common';
import { BillboardController } from './controllers/billboard.controller';
import { TypeormBillboardService } from './services/typeorm-billboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billboard } from '@/core/entities';
import { BILLBOARD_SERVICE } from '@/core/services';
import { OwnerBillboardController } from './controllers/owner-billboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Billboard])],
  controllers: [BillboardController, OwnerBillboardController],
  providers: [
    {
      provide: BILLBOARD_SERVICE,
      useClass: TypeormBillboardService
    }
  ]
})
export class BillboardModule { }
