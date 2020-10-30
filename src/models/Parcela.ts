import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ContaAReceber } from './ContaAReceber'
import { Recebimento } from './Recebimento'

@Entity('parcelas')
export class Parcela extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dueDate!: Date;

  @Column()
  value!: number;

  @Column({ default: 0 })
  valueReceived!: number;

  @Column()
  number!: number;

  @ManyToOne(() => ContaAReceber)
  contaAReceber!: ContaAReceber;

  @OneToMany(() => Recebimento, recebimento => recebimento.parcela)
  recebimentos!: Recebimento[]
}
