import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Store } from './store.entity';
import { Category } from './category.entity';
import { Size } from './size.entity';
import { Color } from './color.entity';
import { Image } from './image.entity';
import { OrderItem } from './order-item.entity';

@Entity()
@Index(['storeId'])
@Index(['categoryId'])
@Index(['sizeId'])
@Index(['colorId'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @ManyToOne(() => Store, store => store.products)
  store: Store;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @Column()
  sizeId: string;

  @ManyToOne(() => Size, size => size.products)
  size: Size;

  @Column()
  colorId: string;

  @ManyToOne(() => Color, color => color.products)
  color: Color;

  @OneToMany(() => Image, image => image.product)
  images: Image[];

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItem: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
