import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Venda } from './Venda'

@Entity('clientes')
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  shortName!: string;

  @Column()
  cpf!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Venda, venda => venda.cliente)
  vendas!: Venda[];
}
