import { Module } from '@nestjs/common';
import { StoreController } from './controllers/store.controller';
import { TypeormStoreService } from './services/typeorm-store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@/core/entities';
import { STORE_SERVICE } from '@/core/services';
import { OwnerStoreController } from './controllers/owner-store.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoreController, OwnerStoreController],
  providers: [
    {
      provide: STORE_SERVICE,
      useClass: TypeormStoreService
    }
  ]
})
export class StoreModule { }
