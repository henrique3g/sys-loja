import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ProductVenda } from './ProductVenda'

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @OneToMany(type => ProductVenda, productVenda => productVenda.product)
  productVenda: ProductVenda[]
}
