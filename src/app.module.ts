import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from '@/core/core.module';
import { UserModule } from '@/modules/user/user.module';
import { StoreModule } from '@/modules/store/store.module';
import { BillboardModule } from '@/modules/billboard/billboard.module';
import { CategoryModule } from '@/modules/category/category.module';
import { SizeModule } from './modules/size/size.module';
import { ColorModule } from './modules/color/color.module';
import { ProductModule } from './modules/product/product.module';
import { ImageModule } from './modules/image/image.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    UserModule,
    StoreModule,
    BillboardModule,
    CategoryModule,
    SizeModule,
    ColorModule,
    ProductModule,
    ImageModule,
    OrderModule,
    OrderItemModule,
    CoreModule,
    DashboardModule,
    StripeModule.forRootAsync(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }
  ],
})
export class AppModule { }
