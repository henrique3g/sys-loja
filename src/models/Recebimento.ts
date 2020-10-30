import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Parcela } from './Parcela'

@Entity('recebimentos')
export class Recebimento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  paymentDate!: Date;

  @Column()
  value!: number;

  @ManyToOne(() => Parcela)
  parcela!: Parcela;
}
