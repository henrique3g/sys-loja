import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Parcela } from './Parcela'
import { Venda } from './Venda'

@Entity('contas_a_receber')
export class ContaAReceber extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  value!: number;

  @OneToOne(() => Venda, venda => venda.contaAReceber)
  @JoinColumn()
  venda!: Venda;

  @OneToMany(() => Parcela, parcela => parcela.contaAReceber)
  parcelas!: Parcela[]
}
