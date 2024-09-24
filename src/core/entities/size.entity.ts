import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Store } from './store.entity';
import { Product } from './product.entity';

@Entity()
@Index(['storeId'])
export class Size {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @ManyToOne(() => Store, store => store.sizes)
  store: Store;

  @Column()
  name: string;

  @Column()
  value: string;

  @OneToMany(() => Product, product => product.size)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
