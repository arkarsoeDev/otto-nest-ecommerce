import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Billboard } from './billboard.entity';
import { Category } from './category.entity';
import { Size } from './size.entity';
import { Color } from './color.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @OneToMany(() => Billboard, billboard => billboard.store)
  billboards: Billboard[];

  @OneToMany(() => Category, category => category.store)
  categories: Category[];

  @OneToMany(() => Size, size => size.store)
  sizes: Size[];

  @OneToMany(() => Color, color => color.store)
  colors: Color[];

  @OneToMany(() => Product, product => product.store)
  products: Product[];

  @OneToMany(() => Order, order => order.store)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
