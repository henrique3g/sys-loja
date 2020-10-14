import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Cliente } from './Cliente'
import { ProductVenda } from './ProductVenda'

@Entity('vendas')
export class Venda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  input: number;

  @Column()
  total: number;

  @Column()
  discount: number;

  @ManyToOne(type => Cliente, cliente => cliente.vendas)
  cliente?: Cliente;

  @OneToMany(type => ProductVenda, productVenda => productVenda.venda)
  productVenda: ProductVenda[];
}
