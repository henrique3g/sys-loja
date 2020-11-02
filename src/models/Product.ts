import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ProductVenda } from './ProductVenda'

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  description!: string;

  @Column({ length: 20 })
  reference?: string;

  @Column()
  price!: number;

  @Column()
  stock!: number;

  @OneToMany(() => ProductVenda, productVenda => productVenda.product)
  productVenda!: ProductVenda[]
}
