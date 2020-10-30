import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateParcelasTable1602771517236 implements MigrationInterface {
  private table = new Table({
    name: 'parcelas',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      },
      {
        name: 'dueDate',
        type: 'date'
      },
      {
        name: 'value',
        type: 'decimal',
        scale: 2
      },
      {
        name: 'valueReceived',
        type: 'decimal',
        scale: 2,
        default: 0
      },
      {
        name: 'number',
        type: 'integer',
        unsigned: true
      },
      {
        name: 'contaAReceberId',
        type: 'integer'

      }
    ],
    foreignKeys: [
      {
        name: 'fk_conta_parcela',
        columnNames: ['contaAReceberId'],
        referencedTableName: 'contas_a_receber',
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
