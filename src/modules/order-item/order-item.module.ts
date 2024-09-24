import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { TypeormOrderItemService } from './services/typeorm-order-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from '@/core/entities';
import { ORDER_ITEM_SERVICE } from '@/core/services';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemController],
  providers: [
    {
      provide: ORDER_ITEM_SERVICE,
      useClass: TypeormOrderItemService
    }
  ],
  exports: [
    {
      provide: ORDER_ITEM_SERVICE,
      useClass: TypeormOrderItemService
    }
  ]
})
export class OrderItemModule { }
