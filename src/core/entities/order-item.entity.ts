import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { IsInt, Min } from 'class-validator';

@Entity()
@Index(['orderId'])
@Index(['productId'])
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @ManyToOne(() => Order, order => order.orderItems)
  order: Order;

  @Column()
  productId: string;

  @ManyToOne(() => Product, product => product.orderItem)
  product: Product;

  @Column('int')
  @IsInt()
  @Min(1)
  quantity: number;

  @Column('int')
  price: number;
}
