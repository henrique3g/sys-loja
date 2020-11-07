import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Cliente } from './Cliente'
import { ContaAReceber } from './ContaAReceber'
import { ProductVenda } from './ProductVenda'

@Entity('vendas')
export class Venda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  input!: number;

  @Column()
  total!: number;

  @Column()
  discount!: number;

  @ManyToOne(() => Cliente, cliente => cliente.vendas)
  cliente?: Cliente;

  @OneToOne(() => ContaAReceber, contaAReceber => contaAReceber.venda)
  contaAReceber?: ContaAReceber

  @OneToMany(() => ProductVenda, productVenda => productVenda.venda)
  productVenda!: ProductVenda[];
}
