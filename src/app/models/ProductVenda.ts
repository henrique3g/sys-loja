import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './Product'
import { Venda } from './Venda'

@Entity('product_venda')
export class ProductVenda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  price: number;

  @ManyToOne(type => Product, product => product.productVenda)
  product: Product;

  @ManyToOne(type => Venda, venda => venda.productVenda)
  venda: Venda;
}
