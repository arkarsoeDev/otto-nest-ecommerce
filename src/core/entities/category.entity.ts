import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Store } from './store.entity';
import { Billboard } from './billboard.entity';
import { Product } from './product.entity';

@Entity()
@Index(['storeId'])
@Index(['billboardId'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @ManyToOne(() => Store, store => store.categories)
  store: Store;

  @Column()
  billboardId: string;

  @ManyToOne(() => Billboard, billboard => billboard.categories)
  billboard: Billboard;

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
