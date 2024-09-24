import { GraphDataDto } from '@/core/models/app/dashboard/graph-data.dto';
import { DASHBOARD_SERVICE, DashboardService } from '@/core/services';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(@Inject(DASHBOARD_SERVICE) private dashboardService: DashboardService) { }

  @Get('/:storeId/get-graph-revenue')
  async getGraphRevenue(@Param('storeId') storeId: string) {
    const data = await this.dashboardService.getGraphRevenue(storeId)

    return { content: data }
  }

  @Get('/:storeId/get-total-revenue')
  async getTotalRevenue(@Param('storeId') storeId: string) {
    const data = await this.dashboardService.getTotalRevenue(storeId)

    return { content: data }
  }

  @Get('/:storeId/get-stock-count')
  async getStockCount(@Param('storeId') storeId: string) {
    const data = await this.dashboardService.getStockCount(storeId)

    return { content: data }
  }

  @Get('/:storeId/get-sales-count')
  async getSalesCount(@Param('storeId') storeId: string) {
    const data = await this.dashboardService.getSalesCount(storeId)

    return { content: data }
  }
}
