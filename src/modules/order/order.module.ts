import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { TypeormOrderService } from './services/typeorm-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@/core/entities';
import { ORDER_SERVICE } from '@/core/services';
import { OrderItemModule } from '@/modules/order-item/order-item.module';
import { OwnerOrderController } from './controllers/owner-order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderItemModule],
  controllers: [OrderController, OwnerOrderController],
  providers: [
    {
      provide: ORDER_SERVICE,
      useClass: TypeormOrderService
    },
  ],
  exports: [
    {
      provide: ORDER_SERVICE,
      useClass: TypeormOrderService
    },
  ]
})
export class OrderModule { }
