import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Store } from './store.entity';
import { Category } from './category.entity';

@Entity()
@Index(['storeId'])
export class Billboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @ManyToOne(() => Store, store => store.billboards, { cascade: true, onDelete: 'CASCADE' })
  store: Store;

  @Column()
  label: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Category, category => category.billboard)
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
