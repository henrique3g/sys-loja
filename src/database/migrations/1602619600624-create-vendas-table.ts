import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateVendasTable1602619600624 implements MigrationInterface {
  private table = new Table({
    name: 'vendas',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      },
      {
        name: 'total',
        type: 'decimal',
        scale: 2
      },
      {
        name: 'input',
        type: 'decimal',
        scale: 2
      },
      {
        name: 'discount',
        type: 'decimal',
        scale: 2
      },
      {
        name: 'date',
        type: 'date'
      },
      {
        name: 'clienteId',
        type: 'integer',
        isNullable: true
      }
    ],
    foreignKeys: [
      {
        name: 'cliente_venda_fk',
        columnNames: ['clienteId'],
        referencedTableName: 'clientes',
        referencedColumnNames: ['id']
      }
    ]
  })

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
