import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DashboardService } from '@/core/services/dashboard.service.interface';
import { GraphDataDto } from '@/core/models/app/dashboard/graph-data.dto';
import { Order, Product } from '@/core/entities';

@Injectable()
export class TypeormDashboardService implements DashboardService {
  constructor(private dataSource: DataSource) { }

  async getGraphRevenue(storeId: string): Promise<GraphDataDto[]> {
    const paidOrders = await this.dataSource.getRepository(Order).find({
      where: {
        storeId,
        isPaid: true,
      },
      relations: ['orderItems', 'orderItems.product'],
    });

    console.log(paidOrders)

    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of paidOrders) {
      const month = order.createdAt.getMonth();
      let revenueForOrder = 0;

      for (const item of order.orderItems) {
        revenueForOrder += Number(item.product.price);
      }

      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphData: GraphDataDto[] = Array.from({ length: 12 }, (_, index) => ({
      name: new Date(0, index).toLocaleString('default', { month: 'short' }),
      total: 0,
    }));

    for (const month in monthlyRevenue) {
      graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
  }

  async getSalesCount(storeId: string): Promise<number> {
    const salesCount = await this.dataSource.getRepository(Order).count({
      where: {
        storeId,
        isPaid: true,
      },
    });

    return salesCount
  }

  async getStockCount(storeId: string): Promise<number> {
    const stocksCount = await this.dataSource.getRepository(Product).count({
      where: {
        storeId,
        isArchived: false
      },
    });

    return stocksCount
  }

  async getTotalRevenue(storeId: string): Promise<number> {
    const paidOrders = await this.dataSource.getRepository(Order).find({
      where: {
        storeId,
        isPaid: true,
      },
      relations: ['orderItems', 'orderItems.product'],
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {
        return orderSum + Number(item.product.price); // Ensure price is a number
      }, 0);

      return total + orderTotal;
    }, 0);

    return totalRevenue;
  }
}
