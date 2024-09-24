import { Module } from '@nestjs/common';
import { TypeormDashboardService } from './services/typeorm-dashboard.service';
import { DASHBOARD_SERVICE } from '@/core/services';
import { DashboardController } from './controllers/dashboard.controller';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [DashboardController],
  providers: [
    {
      provide: DASHBOARD_SERVICE,
      useClass: TypeormDashboardService
    }
  ]
})
export class DashboardModule { }
