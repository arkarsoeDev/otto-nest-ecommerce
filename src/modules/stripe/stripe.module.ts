import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { OrderModule } from '../order/order.module';
import { OrderItemModule } from '../order-item/order-item.module';
import { StripeController } from './stripe.controller';

@Module({})
export class StripeModule {

  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot(), OrderModule, OrderItemModule],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_API_KEY'),
          inject: [ConfigService],
        },
      ]
    };
  }
}
