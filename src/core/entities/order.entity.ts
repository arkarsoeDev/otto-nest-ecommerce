import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Store } from './store.entity';
import { User } from './user.entity';

@Entity()
@Index(['storeId'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @ManyToOne(() => Store, store => store.orders)
  store: Store;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[];

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
