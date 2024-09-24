import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Product } from './product.entity';
import { Store } from './store.entity';

@Entity()
@Index(['storeId'])
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @ManyToOne(() => Store, store => store.colors)
  store: Store;

  @Column()
  name: string;

  @Column()
  value: string;

  @OneToMany(() => Product, product => product.color)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
