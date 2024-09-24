import { GraphDataDto } from "../models/app/dashboard/graph-data.dto";

export interface DashboardService {

  getGraphRevenue(storeId: string): Promise<GraphDataDto[]>;

  getSalesCount(storeId: string): Promise<number>;

  getStockCount(storeId: string): Promise<number>;

  getTotalRevenue(storeId: string): Promise<number>;

  // findOne(id: string): Promise<Dashboard>;

  // findAll(query: DashboardQueryDto): Promise<PaginatedDataDto<Dashboard>>;

  // update(payload: UpdateDashboardDto): Promise<Dashboard>;

  // delete(id: string): Promise<void>;
}

export const DASHBOARD_SERVICE = 'DashboardService';
